import React from 'react';
import { getPeptideById } from '@lib/services/api/endpoints/peptides';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { makePeptidePdbPreviewImageUrl } from '@lib/services/downloadServer/urls/peptides';
import { getPeptidePdbContent } from '@lib/services/downloadServer/endpoints/peptides';

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
    pageTitle: peptide.sequence,
    images: [makePeptidePdbPreviewImageUrl(peptide.id)]
  });
};

interface Props extends Params {

}

const PeptidePage = async ({ params }: Props) => {
  const peptide = await getPeptideById(params.id);
  if (!peptide) {
    return notFound();
  }

  const pdbString = await getPeptidePdbContent(peptide.id);

  return (
    <div>
      <pre>
        {JSON.stringify(peptide, null, 2)}
      </pre>
      <pre>
        {pdbString}
      </pre>
    </div>
  );
};

export default PeptidePage;
