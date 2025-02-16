import React from 'react';
import { SearchBoxWrapper } from '../../helpers/utils/searchBoxWrapper';
import { SingleQueryPeptideSearchBox } from '../../tabs/SingleQueryPeptideSearchBox';
import { SingleQueryAlignmentContext } from '@lib/services/bioApi/models/search';

interface Props {
  defaultValues?: SingleQueryAlignmentContext
}

export const WrappedSingleQueryPeptideSearchBox: React.FC<Props> = ({ defaultValues }) => {
  return (
    <SearchBoxWrapper>
      <SingleQueryPeptideSearchBox defaultValues={defaultValues} />
    </SearchBoxWrapper>
  );
};
