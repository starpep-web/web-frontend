import React from 'react';
import BSTable from 'react-bootstrap/Table';

interface Props {
  headers: string[]
  children?: React.ReactNode
}

export const Table: React.FC<Props> = ({ headers, children }) => {
  return (
    <BSTable>
      <thead className="border-2 border-top-0 border-start-0 border-end-0">
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
    </BSTable>
  );
};
