import React from 'react';

interface Props {
  title: string
  // peptideTotalCount: number
  // searchType: SearchType
  // exportPayloadData: string
}

// TODO: SearchExportButton.
export const PeptideSearchHeading: React.FC<Props> = ({ title }) => {
  return (
    <div className="d-flex flex-column flex-md-row mb-4">
      <h1 className="flex-fill mb-4">
        {title}
      </h1>

      {/* <SearchExportButton peptideTotalCount={peptideTotalCount} searchType={searchType} exportPayloadData={exportPayloadData} />*/}
    </div>
  );
};
