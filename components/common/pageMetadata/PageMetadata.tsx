import React from 'react';
import Head from 'next/head';
import { SITE_TITLE } from '@lib/constants/site';

interface Props {
  title: string
}

const PageMetadata: React.FC<Props> = ({ title }) => {
  const completeTitle = `${title} - ${SITE_TITLE}`;

  return (
    <Head>
      <title>{completeTitle}</title>
    </Head>
  );
};

export default PageMetadata;
