import React, { useState, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import { SearchExportResource, SearchExportFormData, DEFAULT_EXPORT_FORM_DATA } from '@lib/services/bioApi/models/export';

type FormFields = {
  [k: string]: {
    type: SearchExportResource
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
  initialData?: SearchExportFormData
  onChange?: (state: SearchExportFormData) => void
}

const SearchExportForm: React.FC<Props> = ({ initialData, onChange }) => {
  const [formState, setFormState] = useState<SearchExportFormData>(initialData ?? DEFAULT_EXPORT_FORM_DATA);

  const handleChange = (key: keyof SearchExportFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    const newState: SearchExportFormData = {
      ...formState,
      [key]: e.currentTarget.checked
    };

    setFormState(newState);
    onChange?.(newState);
  };

  return (
    <Card className="mb-3">
      <CardBody>
        {
          Object.entries(formFields).map(([label, fields]) => (
            <Form.Group key={label} className="mb-3">
              <Form.Label className="fw-semibold" column={false}>
                {label}
              </Form.Label>

              {
                fields.map(({ type, text }) => (
                  <Form.Check key={type} type="checkbox" className="w-100" onChange={handleChange(type)} value={type} checked={formState[type]} label={text} />
                ))
              }
            </Form.Group>
          ))
        }
      </CardBody>
    </Card>
  );
};

export default SearchExportForm;
