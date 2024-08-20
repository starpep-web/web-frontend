import React from 'react';
import { Heading, Block } from 'react-bulma-components';
import { SearchExportButton } from '@components/search/searchExport';
import { SearchType } from '@lib/models/export';
import styles from './PeptideSearchResultHeading.module.scss';

interface Props {
  title: string
  peptideTotalCount: number
  searchType: SearchType
  exportPayloadData: string
}

const PeptideSearchResultHeading: React.FC<Props> = ({ title, peptideTotalCount, searchType, exportPayloadData }) => {
  return (
    <Block className={styles['heading-block']}>
      <Heading className="is-flex-grow-1">
        {title}
      </Heading>

      <SearchExportButton peptideTotalCount={peptideTotalCount} searchType={searchType} exportPayloadData={exportPayloadData} />
    </Block>
  );
};

export default PeptideSearchResultHeading;
