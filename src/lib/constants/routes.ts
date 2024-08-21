export const RouteDefs = {
  home: '/',
  about: '/#about',
  contact: '/#contact',
  faq: '/faq',
  search: '/search',
  statistics: '/statistics',
  statisticsGeneralInformation: '/statistics/general-information',
  statisticsMetadata: '/statistics/metadata',
  statisticsFeatures: '/statistics/features',
  downloads: '/downloads',
  peptide: (id: string) => `/peptide/${id}`
};
