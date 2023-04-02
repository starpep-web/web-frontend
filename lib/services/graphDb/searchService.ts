/* eslint-disable max-params */
import { readTransaction } from './dbService';
import { NodeLabel } from '@lib/models/peptide';
import { createPagination, WithPagination } from '@lib/utils/pagination';


export const getMetadataSuggestions = async (nodeLabel: Omit<NodeLabel, 'Peptide'>, name: string, limit: number, skip: number): Promise<string[]> => {
  const query = `MATCH (n:${nodeLabel}) WHERE toLower(n.name) STARTS WITH toLower($name) RETURN n.name AS name SKIP $skip LIMIT $limit`; // We can interpolate the nodeLabel because this is never user generated.
  const result = await readTransaction(query, { name, limit, skip });

  return result.records.map((record) => {
    return record.get('name');
  });
};

export const getMetadataSuggestionsPaginated = async (nodeLabel: Omit<NodeLabel, 'Peptide'>, name: string, page: number, limit = 30): Promise<WithPagination<string[]>> => {
  const start = (page - 1) * limit;

  const countQuery = `MATCH (n:${nodeLabel}) WHERE toLower(n.name) STARTS WITH toLower($name) RETURN COUNT(n) AS c`;
  const result = await readTransaction(countQuery, { name });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await getMetadataSuggestions(nodeLabel, name, limit, start),
    pagination
  };
};

export const getDatabaseSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Database', name, page);
};

export const getCTerminusSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Cterminus', name, page);
};

export const getNTerminusSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Nterminus', name, page);
};

export const getFunctionSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Function', name, page);
};

export const getOriginSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Origin', name, page);
};

export const getTargetSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('Target', name, page);
};

export const getUnusualAASuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('UnusualAA', name, page);
};

export const getCrossRefSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestionsPaginated('CrossRef', name, page);
};
