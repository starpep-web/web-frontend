import { PUBLIC_DOWNLOADS_URL } from '@lib/config';

export const SITE_TITLE = 'StarPep Web';

export const DEFAULT_SITE_DESCRIPTION = `${SITE_TITLE} is a non-redundant database of over 45000 antimicrobial peptides (AMPs).`;

// General Download Links

export const DOWNLOADS_PDB_ARCHIVE = `${PUBLIC_DOWNLOADS_URL}/zip/StarPepPDB.zip`;
export const DOWNLOADS_FASTA_BY_DB_ARCHIVE = `${PUBLIC_DOWNLOADS_URL}/zip/StarPepFASTA-Databases.zip`;

export const DOWNLOADS_FULL_METADATA_CSV = `${PUBLIC_DOWNLOADS_URL}/full/csv/StarPep-Metadata-Full.csv`;

export const DOWNLOADS_DB_ARCHIVES = {
  ORIGINAL: `${PUBLIC_DOWNLOADS_URL}/db/StarPepDB-original.zip`
};

const STARPEP_FASTA_VERSIONS = ['1.00', '0.90', '0.80', '0.70', '0.60', '0.50'];
export const DOWNLOADS_STARPEP_FASTA = Object.fromEntries(STARPEP_FASTA_VERSIONS.map((version) => {
  return [version, `${PUBLIC_DOWNLOADS_URL}/full/fasta/StarPepFASTA-${version}.fasta`];
}));

const FASTA_BY_DB_DATABASES = ['ADAM', 'AMPer', 'AMSDb', 'ANTISTAPHYBASE', 'APD', 'AVPdb', 'AntiTbPdb',
  'BaAMP', 'Bactibase', 'Bagel_I', 'Bagel_II', 'CAMP_Patent', 'CAMP_Structure', 'CAMP_Validate', 'CancerPPD',
  'CyBase_Cyclotides', 'DADP', 'DAMPD', 'DBAASP', 'DRAMP_Clinical', 'DRAMP_General', 'DRAMP_Patentl', 'Defensins',
  'HIPdb', 'Hemolytik', 'InverPep', 'LAMP_Experimental', 'LAMP_Patent', 'MilkAMP', 'NeuroPep', 'ParaPep',
  'PepBase', 'PhytAMP', 'RAPD', 'SATPdb', 'StarPepDB', 'THPdb', 'UniProtkb', 'YADAMP', 'dbAMP', 'straPep'
];
const FASTA_BY_DB_VERSIONS = ['1.00', '0.90', '0.50'];
export const DOWNLOADS_FASTA_BY_DB = Object.fromEntries(FASTA_BY_DB_DATABASES.map((db) => {
  return [db, Object.fromEntries(FASTA_BY_DB_VERSIONS.map((version) => {
    return [version, `${PUBLIC_DOWNLOADS_URL}/fasta-by-db/${db}-${version}.fasta`];
  }))];
}));
