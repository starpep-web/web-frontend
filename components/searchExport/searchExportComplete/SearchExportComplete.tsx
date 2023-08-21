import React from 'react';
import { SearchExportFormData } from '@lib/models/export';

interface Props {
  id: string
  form: SearchExportFormData
  peptideIds: string[]
  total: number
}

const SearchExportComplete: React.FC<Props> = () => {
  return null;
};

export default SearchExportComplete;
