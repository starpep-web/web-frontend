import React from 'react';
import { SearchBoxWrapper } from '../../helpers/utils/searchBoxWrapper';
import { TextQueryPeptideSearchBox } from '../../tabs/TextQueryPeptideSearchBox';
import { TextQueryResponseParams } from '@lib/services/api/models/search';

interface Props {
  defaultValues?: TextQueryResponseParams
}

export const WrappedTextQueryPeptideSearchBox: React.FC<Props> = ({ defaultValues }) => {
  return (
    <SearchBoxWrapper>
      <TextQueryPeptideSearchBox defaultValues={defaultValues} />
    </SearchBoxWrapper>
  );
};
