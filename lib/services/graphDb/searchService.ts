import { readTransaction } from './dbService';
import { NodeLabel } from '@lib/models/peptide';

export const getMetadataSuggestions = async (nodeLabel: Omit<NodeLabel, 'Peptide'>, name: string): Promise<string[]> => {
  const query = `MATCH (n:${nodeLabel}) WHERE n.name STARTS WITH $name RETURN n.name AS name LIMIT 30`; // We can interpolate the nodeLabel because this is never user generated.
  const result = await readTransaction(query, { name });

  return result.records.map((record) => {
    return record.get('name');
  });
};

export const getDatabaseSuggestions = (name: string) => {
  return getMetadataSuggestions('Database', name);
};

export const getCTerminusSuggestions = (name: string) => {
  return getMetadataSuggestions('Cterminus', name);
};

export const getNTerminusSuggestions = (name: string) => {
  return getMetadataSuggestions('Nterminus', name);
};

export const getFunctionSuggestions = (name: string) => {
  return getMetadataSuggestions('Function', name);
};

export const getOriginSuggestions = (name: string) => {
  return getMetadataSuggestions('Origin', name);
};

export const getTargetSuggestions = (name: string) => {
  return getMetadataSuggestions('Target', name);
};

export const getUnusualAASuggestions = (name: string) => {
  return getMetadataSuggestions('UnusualAA', name);
};

export const getCrossRefSuggestions = (name: string) => {
  return getMetadataSuggestions('CrossRef', name);
};
