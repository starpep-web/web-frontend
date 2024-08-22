import { Metadata } from 'next';
import { PUBLIC_URL } from '@lib/config/app';
import { DEFAULT_SITE_DESCRIPTION, SITE_TITLE, SITE_CATEGORY, CONTENT_LANG, DEFAULT_SEO_IMAGE } from '@lib/constants/app';

export interface CreatePageMetadataOptions {
  pageTitle: string
  description?: string
  images?: string[]
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
}

export const createPageMetadata = (path: string, options: CreatePageMetadataOptions): Metadata => {
  const pageTitle = `${options.pageTitle} | ${SITE_TITLE}`;
  const images = options.images ? options.images.slice(0, 4) : [`${PUBLIC_URL}${DEFAULT_SEO_IMAGE}`];

  return {
    title: pageTitle,
    description: options.description ?? DEFAULT_SITE_DESCRIPTION,
    metadataBase: new URL(PUBLIC_URL),
    alternates: {
      canonical: path
    },
    category: SITE_CATEGORY,
    openGraph: {
      title: pageTitle,
      description: options.description,
      siteName: SITE_TITLE,
      images,
      locale: CONTENT_LANG,
      type: options.ogType ?? 'website'
    },
    twitter: {
      card: options.twitterCard ?? 'summary',
      title: pageTitle,
      description: options.description,
      images
    }
  };
};
