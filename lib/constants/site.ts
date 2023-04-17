import { PUBLIC_DOWNLOADS_URL } from '@lib/config';

export const SITE_TITLE = 'StarPep Web';

export const DEFAULT_SITE_DESCRIPTION = `${SITE_TITLE} is a non-redundant database of over 45000 antimicrobial peptides (AMPs).`;

// General Download Links

export const DOWNLOADS_PDB_ARCHIVE = `${PUBLIC_DOWNLOADS_URL}/zip/StarPepPDB.zip`;
export const DOWNLOADS_FASTA_ARCHIVE = `${PUBLIC_DOWNLOADS_URL}/zip/StarPepFASTA.zip`;
export const DOWNLOADS_DB_ARCHIVES = {
  ORIGINAL: `${PUBLIC_DOWNLOADS_URL}/db/StarPepDB-original.zip`
};
export const DOWNLOADS_FULL_FASTA = `${PUBLIC_DOWNLOADS_URL}/full/StarPepFASTA-Full.fasta`;
export const DOWNLOADS_FULL_METADATA_CSV = `${PUBLIC_DOWNLOADS_URL}/full/StarPep-Metadata-Full.csv`;
