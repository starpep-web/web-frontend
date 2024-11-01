import { MetadataRoute } from 'next';
import { NEXT_PUBLIC_URL } from '@lib/config/app';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/assets/']
    },
    sitemap: `${NEXT_PUBLIC_URL}/sitemap.xml`
  };
};

export default robots;
