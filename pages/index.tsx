import React from 'react';
import type { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { GraphVisualization } from '@components/common/graphVisualization';
import { getPeptidesConstitutedBy } from '@lib/services/graphDb/peptideService';

interface ServerSideProps {
  result: any
}

interface Props extends ServerSideProps {

}

const HomePage: React.FC<Props> = ({ result }) => {
  const { nodes, edges } = result.reduce((acc: any, r: any) => {
    for (const item of r) {
      acc.edges.push({ id: null, from: item.start, to: item.end });

      if (!acc.nodes.find((n: any) => n.id === item.start)) {
        acc.nodes.push({ id: item.start, label: item.startName });
      }
      if (!acc.nodes.find((n: any) => n.id === item.end)) {
        acc.nodes.push({ id: item.end, label: item.endName });
      }
    }

    return acc;
  }, { nodes: [], edges: [] });

  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      Main Page

      <GraphVisualization nodes={nodes} edges={edges} />
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const result = await getPeptidesConstitutedBy();

  return { props: { result } };
};

export default HomePage;
