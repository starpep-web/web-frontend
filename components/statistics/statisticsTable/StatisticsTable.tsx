import React from 'react';
import { Table } from '@components/common/table';

interface Props {
  data: Record<string, number>

  headers: [string, string]
}

const StatisticsTable: React.FC<Props> = ({ data, headers }) => {
  return (
    <Table headers={headers}>
      {
        Object.entries(data).map(([key, value], idx) => (
          <tr key={idx}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))
      }
    </Table>
  );
};

export default StatisticsTable;
