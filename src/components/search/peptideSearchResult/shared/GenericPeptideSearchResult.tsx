import React from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import { Table } from '@components/common/table';
import { SearchPeptide } from '@lib/services/api/models/peptide';
import { RowProps } from './types';

interface Props<T extends SearchPeptide> {
  peptides: T[]
  headers: string[]
  rowComponent: React.JSXElementConstructor<RowProps<T>>
  firstIndex: number
}

export const GenericPeptideSearchResult = <T extends SearchPeptide>({
  peptides,
  headers,
  rowComponent,
  firstIndex
}: Props<T>) => {
  const RowComponent = rowComponent;

  if (peptides.length < 1) {
    return (
      <Card className="mb-4">
        <CardBody>
          No results found for your query.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <Table headers={headers}>
          {
            peptides.map((peptide, idx) => (
              <RowComponent key={peptide.id} index={firstIndex + idx + 1} {...peptide} />
            ))
          }
        </Table>
      </CardBody>
    </Card>
  );
};
