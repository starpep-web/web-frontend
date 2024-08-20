import { QueryResult, int, Integer } from 'neo4j-driver';
import { readTransaction, sanitizeInput } from './dbService';
import {
  SearchResultPeptide,
  FullPeptide,
  PeptideMetadata,
  PeptideAttributes,
  RawRelationshipLabel,
  MetadataRelationshipLabel,
  getRelationshipLabelFromRaw,
  getPeptideId, extractIdentityFromId
} from '@lib/models/peptide';
import { WithPagination, createPagination } from '@lib/utils/pagination';
import {
  FiltersObject,
  SequenceLengthFilter,
  TextQueryAttributeFilter,
  TextQueryMetadataFilter
} from '@lib/models/search';
import { WithExportPayloadData, ExportPayloadData } from '@lib/models/export';
import { BitArray, bitArrayToBase64 } from '@lib/utils/export';

const parseSearchPeptideAttributes = (properties: PeptideAttributes.Neo4jProperties): PeptideAttributes.SearchAttributes => {
  return {
    hydropathicity: properties.hydropathicity,
    charge: properties.charge.toInt(),
    isoelectricPoint: properties.isoelectric_point,
    bomanIndex: properties.boman_index,
    gaacAlphatic: properties.gaac_alphatic,
    gaacAromatic: properties.gaac_aromatic,
    gaacPositiveCharge: properties.gaac_positive_charge,
    gaacNegativeCharge: properties.gaac_negative_charge,
    gaacUncharge: properties.gaac_uncharge
  };
};

const parseFullPeptideAttributes = (properties: PeptideAttributes.Neo4jProperties): PeptideAttributes.FullAttributes => {
  return {
    ...parseSearchPeptideAttributes(properties),
    hydrophobicity: properties.hydrophobicity,
    solvation: properties.solvation,
    amphiphilicity: properties.amphiphilicity,
    hydrophilicity: properties.hydrophilicity,
    hemolyticProbScore: properties.hemolytic_prob_score,
    stericHindrance: properties.steric_hindrance,
    netHydrogen: properties.net_hydrogen.toInt(),
    molWt: properties.mol_wt,
    aliphaticIndex: properties.aliphatic_index
  };
};

const parseFullPeptideFromQueryResult = (result: QueryResult): FullPeptide | null => {
  const [firstRecord] = result.records;

  if (!firstRecord) {
    return null;
  }

  const peptideNode = firstRecord.get('n');
  const [metadata, attributes]: [PeptideMetadata, PeptideAttributes.FullAttributes] = result.records.reduce((peptideData, record) => {
    const rawRelationship: RawRelationshipLabel = record.get('r').type;

    if (rawRelationship === 'characterized_by') {
      peptideData[1] = parseFullPeptideAttributes(record.get('v').properties);
    } else {
      const peptideDataObject = peptideData[0];
      const relationship = getRelationshipLabelFromRaw(rawRelationship) as MetadataRelationshipLabel;
      const value = record.get('v').properties.name;

      if (!peptideDataObject[relationship]) {
        peptideDataObject[relationship] = [value];
      } else {
        peptideDataObject[relationship]!.push(value);
      }
    }

    return peptideData;
  }, [{}, {}] as [PeptideMetadata, PeptideAttributes.FullAttributes]);

  return {
    id: getPeptideId(peptideNode.identity.toInt()),
    sequence: peptideNode.properties.seq,
    length: peptideNode.properties.seq.length,
    metadata,
    attributes
  };
};

export const getPeptideById = async (id: string): Promise<FullPeptide | null> => {
  const identity = extractIdentityFromId(id);
  if (!identity) {
    return null;
  }

  const query = 'MATCH (n:Peptide)-[r]->(v) WHERE ID(n) = $id RETURN n, r, v';
  const result = await readTransaction(query, { id: int(identity) });

  return parseFullPeptideFromQueryResult(result);
};

export const getPeptideBySequence = async (sequence: string): Promise<FullPeptide | null> => {
  const query = 'MATCH (n:Peptide {seq: $sequence})-[r]->(v) RETURN n, r, v';
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });

  return parseFullPeptideFromQueryResult(result);
};

const parseSearchSequenceLengthFilter = (filter?: SequenceLengthFilter): string => {
  if (!filter) {
    return '';
  }

  const [min, max] = filter;

  // All options inside the filter object are already validated prior to calling this function.
  return `AND ${min} <= SIZE(n.seq) AND SIZE(n.seq) <= ${max}`;
};

const parseSearchAttributeFilters = (filters?: TextQueryAttributeFilter[]): string => {
  if (!filters || !filters.length) {
    return '';
  }

  // All options inside the filter object are already validated prior to calling this function.
  return filters.reduce((text, [operator, attributeName, comparator, filterValue]) => {
    return text.concat(`${operator} v.${attributeName} ${comparator} ${filterValue}`); // Last white space is important.
  }, '');
};

const parseSearchMetadataFilters = (filters?: TextQueryMetadataFilter[]): string => {
  if (!filters || !filters.length) {
    return '';
  }

  // FilterOperator, MetadataLabel, and FilterComparator are already validated prior to calling this function.
  return filters.reduce((text, [operator, metadataLabel, comparator, filterValue]) => {
    const operatorText = comparator.startsWith('NOT') ? `${operator} NOT` : operator;

    return text.concat(`${operatorText} (n)-[]->(:${metadataLabel} {name: "${sanitizeInput(filterValue)}" }) `); // Last white space is important.
  }, '');
};

export const searchPeptidesTextQuery = async (sequence: string, limit: number, skip: number, sanitizedFilter: string): Promise<SearchResultPeptide[]> => {
  const query = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN DISTINCT(n), v ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { sequence: sequence.toUpperCase(), limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');
    const attributes = parseSearchPeptideAttributes(r.get('v').properties);

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length,
      attributes
    };
  });
};

export const exportPayloadDataForPeptidesTextQuery = async (sequence: string, sanitizedFilter: string): Promise<ExportPayloadData> => {
  const query = `
MATCH (n:Peptide)-[]->(v:Attributes)
WHERE n.seq CONTAINS $sequence ${sanitizedFilter}
WITH DISTINCT(n) AS n
WITH ID(n) AS id
RETURN COLLECT(id) AS ids
`;
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });
  const [record] = result.records;
  const matchedIds: Integer[] = record.get('ids');

  // Caveat: The use of ID(n) depends on there being 45120 peptides since other nodes will have identifiers that start with 45120 and higher.
  // Note: If new peptides are added, the ID should probably inside the node as a property instead of relying on the Neo4j ID.
  const totalPeptides = 45120;

  const matchedIdBitArray: BitArray = new Array(totalPeptides).fill(0);
  matchedIds.forEach((id) => {
    const index = id.toInt();
    matchedIdBitArray[index] = 1;
  });

  return bitArrayToBase64(matchedIdBitArray);
};

export const searchExportablePeptidesTextQueryPaginated = async (
  sequence: string,
  page: number,
  filters?: FiltersObject,
  limit = 50
): Promise<WithExportPayloadData<WithPagination<SearchResultPeptide>>> => {
  const start = (page - 1) * limit;

  const sanitizedLengthFilter = parseSearchSequenceLengthFilter(filters?.length);
  const sanitizedAttributeFilter = parseSearchAttributeFilters(filters?.attributes);
  const sanitizedMetadataFilter = parseSearchMetadataFilters(filters?.metadata);
  const sanitizedFilter = `${sanitizedLengthFilter} ${sanitizedAttributeFilter} ${sanitizedMetadataFilter}`;

  const countQuery = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { sequence: sequence.toUpperCase() });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesTextQuery(sequence, limit, start, sanitizedFilter),
    pagination,
    exportPayloadData: await exportPayloadDataForPeptidesTextQuery(sequence, sanitizedFilter)
  };
};

export const searchPeptidesRegexQuery = async (regex: string, limit: number, skip: number, sanitizedFilter: string): Promise<SearchResultPeptide[]> => {
  const query = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN DISTINCT(n), v ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { regex, limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');
    const attributes = parseSearchPeptideAttributes(r.get('v').properties);

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length,
      attributes
    };
  });
};

export const exportPayloadDataForPeptidesRegexQuery = async (regex: string, sanitizedFilter: string): Promise<ExportPayloadData> => {
  const query = `
MATCH (n:Peptide)-[]->(v:Attributes)
WHERE n.seq =~ $regex ${sanitizedFilter}
WITH DISTINCT(n) AS n
WITH ID(n) AS id
RETURN COLLECT(id) AS ids
`;
  const result = await readTransaction(query, { regex });
  const [record] = result.records;
  const matchedIds: Integer[] = record.get('ids');

  // Caveat: The use of ID(n) depends on there being 45120 peptides since other nodes will have identifiers that start with 45120 and higher.
  // Note: If new peptides are added, the ID should probably inside the node as a property instead of relying on the Neo4j ID.
  const totalPeptides = 45120;

  const matchedIdBitArray: BitArray = new Array(totalPeptides).fill(0);
  matchedIds.forEach((id) => {
    const index = id.toInt();
    matchedIdBitArray[index] = 1;
  });

  return bitArrayToBase64(matchedIdBitArray);
};

export const searchExportablePeptidesRegexQueryPaginated = async (
  regex: string,
  page: number,
  filters?: FiltersObject,
  limit = 50
): Promise<WithExportPayloadData<WithPagination<SearchResultPeptide>>> => {
  const start = (page - 1) * limit;

  const sanitizedLengthFilter = parseSearchSequenceLengthFilter(filters?.length);
  const sanitizedAttributeFilter = parseSearchAttributeFilters(filters?.attributes);
  const sanitizedMetadataFilter = parseSearchMetadataFilters(filters?.metadata);
  const sanitizedFilter = `${sanitizedLengthFilter} ${sanitizedAttributeFilter} ${sanitizedMetadataFilter}`;

  const countQuery = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { regex });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesRegexQuery(regex, limit, start, sanitizedFilter),
    pagination,
    exportPayloadData: await exportPayloadDataForPeptidesRegexQuery(regex, sanitizedFilter)
  };
};
