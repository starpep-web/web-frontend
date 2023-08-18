import React from 'react';
import { Heading, Block } from 'react-bulma-components';
import { SearchExportButton } from '@components/search/searchExport';
import styles from './PeptideSearchResultHeading.module.scss';

interface Props {
  title: string
  peptideTotalCount: number
}

const PeptideSearchResultHeading: React.FC<Props> = ({ title, peptideTotalCount }) => {
  return (
    <Block className={styles['heading-block']}>
      <Heading className="is-flex-grow-1">
        {title}
      </Heading>

      <SearchExportButton peptideTotalCount={peptideTotalCount} />
    </Block>
  );
};

export default PeptideSearchResultHeading;
