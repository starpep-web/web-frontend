import { MetadataRoute } from 'next';
import { DEFAULT_SITE_DESCRIPTION, SITE_TITLE } from '@lib/constants/app';
import { RouteDefs } from '@lib/constants/routes';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: SITE_TITLE,
    short_name: SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    start_url: RouteDefs.home,
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [{
      src: '/favicon.ico',
      sizes: '64x64 32x32 16x16',
      type: 'image/x-icon'
    }, {
      src: '/assets/site-logo.png',
      sizes: '512x512',
      type: 'image/png'
    }]
  };
};

export default manifest;
