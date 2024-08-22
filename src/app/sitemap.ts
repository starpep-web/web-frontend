import { MetadataRoute } from 'next';
import { RouteDefs } from '@lib/constants/routes';
import { PUBLIC_URL } from '@lib/config/app';

type SitemapEntry = MetadataRoute.Sitemap[number];
type SitemapChangeFrequency = SitemapEntry['changeFrequency'];

const makeSitemapEntry = (route: string, changeFrequency: SitemapChangeFrequency, priority: number): SitemapEntry => {
  return {
    url: `${PUBLIC_URL}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  };
};

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    makeSitemapEntry(RouteDefs.home, 'monthly', 1),
    makeSitemapEntry(RouteDefs.faq, 'yearly', 0.7),
    makeSitemapEntry(RouteDefs.search, 'yearly', 0.7),
    makeSitemapEntry(RouteDefs.statistics, 'yearly', 0.6),
    makeSitemapEntry(RouteDefs.statisticsGeneralInformation, 'yearly', 0.6),
    makeSitemapEntry(RouteDefs.statisticsMetadata, 'yearly', 0.6),
    makeSitemapEntry(RouteDefs.statisticsFeatures, 'yearly', 0.6),
    makeSitemapEntry(RouteDefs.downloads, 'yearly', 0.5)
  ];
};

export default sitemap;
