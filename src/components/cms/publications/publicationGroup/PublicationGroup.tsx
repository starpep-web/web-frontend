import React from 'react';
import { Maybe } from '@lib/utils/types';
import { Publication } from '@components/cms/publications/publication';

interface Props {
  className?: string;
  title?: Maybe<string>;
  publications?: Maybe<
    Maybe<{
      citation: string;
      link?: Maybe<string>
    }>[]
  >
}

export const PublicationGroup: React.FC<Props> = ({ className, title, publications }) => {
  if (!publications?.length) {
    return null;
  }

  return (
    <section className={className}>
      <h3 className="mb-4 text-decoration-underline">
        {title}
      </h3>

      {
        publications.map((publication, idx) => publication && (
          <Publication
            key={idx}
            className="mb-4"
            {...publication}
          />
        ))
      }
    </section>
  );
};
