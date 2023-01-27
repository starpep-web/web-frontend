import React from 'react';
import Head from 'next/head';
import { SITE_TITLE, DEFAULT_SITE_DESCRIPTION } from '@lib/constants/site';
import { WEBSITE_URL } from '@lib/config';

interface Props {
  title: string
  description?: string
  image?: string
  imageAlt?: string
}

const PageMetadata: React.FC<Props> = ({ title, description, image, imageAlt }) => {
  const completeTitle = `${title} - ${SITE_TITLE}`;
  const descriptionText = description ?? DEFAULT_SITE_DESCRIPTION;
  const imageUrl = image ?? `${WEBSITE_URL}/android-chrome-256x256.png`;
  const imageAltText = imageAlt ?? 'Peptide graph.';

  return (
    <Head>
      <title>{completeTitle}</title>

      {/* Responsiveness */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />

      {/* OpenGraph meta tags. Spec available at: https://ogp.me/ */}
      <meta property="og:title" content={completeTitle} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAltText} />

      {/* Twitter Card meta tags. Spec available at: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
      <meta name="twitter:title" content={completeTitle} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAltText} />
    </Head>
  );
};

export default PageMetadata;
