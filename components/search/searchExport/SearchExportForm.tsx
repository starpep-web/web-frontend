import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form } from 'react-bulma-components';
import { SearchExportType, SearchExportFormData } from '@lib/models/export';

const initialState: SearchExportFormData = {
  fasta: true,
  metadata: false,
  attributes: false,
  esmMean: false,
  iFeatureAac: false,
  iFeatureDpc: false,
  pdb: false
};

type FormFields = {
  [k: string]: {
    type: SearchExportType
    text: string
  }[]
};

const formFields: FormFields = {
  'Peptide Information': [
    { type: 'fasta', text: 'Include FASTA sequences' },
    { type: 'metadata', text: 'Include metadata' },
    { type: 'attributes', text: 'Include attributes' }
  ],
  Embeddings: [
    { type: 'esmMean', text: 'Include ESM-mean embeddings' },
    { type: 'iFeatureAac', text: 'Include iFeature-AAC-20 embeddings' },
    { type: 'iFeatureDpc', text: 'Include iFeature-DPC-400 embeddings' }
  ],
  Assets: [
    { type: 'pdb', text: 'Include 3D structure files (.pdb)' }
  ]
};

interface Props {
  onChange?: (state: SearchExportFormData) => void
}

const SearchExportForm: React.FC<Props> = ({ onChange }) => {
  const [formState, setFormState] = useState<SearchExportFormData>(initialState);

  const handleChange = (key: keyof SearchExportFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    const newState: SearchExportFormData = {
      ...formState,
      [key]: e.currentTarget.checked
    };

    setFormState(newState);
    onChange?.(newState);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        Object.entries(formFields).map(([label, fields]) => (
          <Form.Field key={label}>
            <Form.Label>
              {label}
            </Form.Label>

            {
              fields.map(({ type, text }) => (
                <Form.Checkbox key={type} className="w-100" onChange={handleChange(type)} checked={formState[type]}>
                  {text}
                </Form.Checkbox>
              ))
            }
          </Form.Field>
        ))
      }
    </form>
  );
};

export default SearchExportForm;
