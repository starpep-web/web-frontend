import React, { Fragment } from 'react';
import { getPeptideById } from '@lib/services/api/endpoints/peptides';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { makePeptidePdbPreviewImageUrl } from '@lib/services/downloadServer/urls/peptides';
import { getPeptidePdbContent } from '@lib/services/downloadServer/endpoints/peptides';
import { PeptideTitle } from '@components/peptide/peptideTitle';
import { PeptideVisualization } from '@components/peptide/peptideVisualization';
import { PeptideInfo } from '@components/peptide/peptideInfo';
import { PeptideAttributes } from '@components/peptide/peptideAttributes';
import { PeptideMetadata } from '@components/peptide/peptideMetadata';
import { PeptideDownloads } from '@components/peptide/peptideDownloads';

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
    <Fragment>
      <PeptideTitle sequence={peptide.sequence} />
      <PeptideVisualization peptide={peptide} pdbString={pdbString} />
      <PeptideInfo {...peptide} />
      <PeptideAttributes attributes={peptide.attributes} />
      <PeptideMetadata metadata={peptide.metadata} />
      <PeptideDownloads id={peptide.id} />
    </Fragment>
  );
};

export default PeptidePage;
