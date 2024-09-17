import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Enum_Componentcommontextcard_Color } from '@lib/services/strapi/graphql/__generated__/graphql';
import { getFromEnum } from '@lib/utils/object';
import { Markdown } from '@components/cms/markdown';

const colorVariants: Record<Enum_Componentcommontextcard_Color, string> = {
  Secondary: 'secondary',
  Dark: 'dark'
};

interface Props {
  className?: string
  color?: Enum_Componentcommontextcard_Color
  text?: string
}

export const TextCard: React.FC<Props> = ({ className, color, text }) => {
  const variant = getFromEnum(colorVariants, color, Enum_Componentcommontextcard_Color.Secondary);

  if (!text) {
    return null;
  }

  return (
    <section className={className}>
      <Alert className="p-5" variant={variant}>
        <Markdown>
          {text}
        </Markdown>
      </Alert>
    </section>
  );
};
