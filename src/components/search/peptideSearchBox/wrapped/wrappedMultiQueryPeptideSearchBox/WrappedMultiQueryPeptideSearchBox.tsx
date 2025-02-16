import React from 'react';
import { SearchBoxWrapper } from '../../helpers/utils/searchBoxWrapper';
import { MultiQueryPeptideSearchBox } from '../../tabs/MultiQueryPeptideSearchBox';
import { MultiQueryAlignmentContext } from '@lib/services/bioApi/models/search';

interface Props {
  defaultValues?: MultiQueryAlignmentContext
}

export const WrappedMultiQueryPeptideSearchBox: React.FC<Props> = ({ defaultValues }) => {
  return (
    <SearchBoxWrapper>
      <MultiQueryPeptideSearchBox defaultValues={defaultValues} />
    </SearchBoxWrapper>
  );
};
