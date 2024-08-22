import { MetadataRoute } from 'next';
import { PUBLIC_URL } from '@lib/config/app';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/assets/']
    },
    sitemap: `${PUBLIC_URL}/sitemap.xml`
  };
};

export default robots();
