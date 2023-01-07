import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_TITLE } from '@lib/constants/site';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <title>{SITE_TITLE}</title>

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
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
