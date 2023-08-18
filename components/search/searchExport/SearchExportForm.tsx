import React, { useState, ChangeEvent } from 'react';
import { Form } from 'react-bulma-components';
import { SearchExportFormData } from '@lib/models/export';

const initialState: SearchExportFormData = {
  fasta: true,
  metadata: false,
  attributes: false,
  esmMean: false,
  iFeatureAac: false,
  iFeatureDpc: false,
  pdb: false
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

  return (
    <form>
      <Form.Field>
        <Form.Label>
          Peptide Information
        </Form.Label>

        <Form.Checkbox className="w-100" onChange={handleChange('fasta')} checked={formState.fasta}>
          Include FASTA sequences
        </Form.Checkbox>

        <Form.Checkbox className="w-100" onChange={handleChange('metadata')} checked={formState.metadata}>
          Include metadata
        </Form.Checkbox>

        <Form.Checkbox className="w-100" onChange={handleChange('attributes')} checked={formState.attributes}>
          Include features
        </Form.Checkbox>
      </Form.Field>

      <Form.Field>
        <Form.Label>
          Embeddings
        </Form.Label>

        <Form.Checkbox className="w-100" onChange={handleChange('esmMean')} checked={formState.esmMean}>
          Include ESM-mean embeddings
        </Form.Checkbox>

        <Form.Checkbox className="w-100" onChange={handleChange('iFeatureAac')} checked={formState.iFeatureAac}>
          Include iFeature-AAC-20 embeddings
        </Form.Checkbox>

        <Form.Checkbox className="w-100" onChange={handleChange('iFeatureDpc')} checked={formState.iFeatureDpc}>
          Include iFeature-DPC-400 embeddings
        </Form.Checkbox>
      </Form.Field>

      <Form.Field>
        <Form.Label>
          Assets
        </Form.Label>

        <Form.Checkbox className="w-100" onChange={handleChange('pdb')} checked={formState.pdb}>
          Include 3D structure files (.pdb)
        </Form.Checkbox>
      </Form.Field>
    </form>
  );
};

export default SearchExportForm;
