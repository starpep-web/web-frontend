import React from 'react';
import { getPeptideById } from '@lib/services/api/endpoints/peptides';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

interface Params {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params } : Params) => {
  const peptide = await getPeptideById(params.id);
  if (!peptide) {
    return createPageMetadata(RouteDefs.peptide(params.id), {
      pageTitle: 'Peptide Not Found'
    });
  }

  return createPageMetadata(RouteDefs.peptide(params.id), {
    pageTitle: peptide.sequence
  });
};

interface Props extends Params {

}

const PeptidePage = async ({ params }: Props) => {
  const peptide = await getPeptideById(params.id);
  if (!peptide) {
    return notFound();
  }

  return (
    <div>
      <pre>
        {JSON.stringify(peptide, null, 2)}
      </pre>
    </div>
  );
};

export default PeptidePage;
