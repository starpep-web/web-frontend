import React from 'react';
import { SearchExportFormData, SearchExportResource } from '@lib/models/export';

interface Props {
  done: SearchExportResource[]
  form: SearchExportFormData
  total: number
}

const SearchExportLoadingWithProgress: React.FC<Props> = () => {
  return null;
};

export default SearchExportLoadingWithProgress;
