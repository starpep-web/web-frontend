import React from 'react';
import clsx from 'clsx';
import BSTable from 'react-bootstrap/Table';

interface Props {
  headers: string[]
  className?: string
  children?: React.ReactNode
}

export const Table: React.FC<Props> = ({ headers, className, children }) => {
  return (
    <div className={clsx('w-100 overflow-x-scroll text-nowrap', className)}>
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
    </div>
  );
};
