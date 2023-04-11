/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Table as BulmaTable } from 'react-bulma-components';

interface Props {
  headers: string[]
  children?: React.ReactNode
}

const Table: React.FC<Props> = ({ headers, children }) => {
  return (
    <BulmaTable.Container>
      <BulmaTable className="mw-100">
        <thead>
          <tr>
            {
              Object.entries(headers).map(([headerKey, headerText]) => (
                <th key={headerKey}>
                  {headerText as any}
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </BulmaTable>
    </BulmaTable.Container>
  );
};

export default Table;
