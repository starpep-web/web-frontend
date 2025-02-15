import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Maybe } from '@lib/utils/types';
import { Markdown } from '@components/cms/utils/markdown';

interface Props {
  className?: string;
  citation: string
  link?: Maybe<string>;
}

export const Publication: React.FC<Props> = ({ className, citation, link }) => {
  return (
    <div className={clsx(className)}>
      <Markdown>
        {citation}
      </Markdown>

      {
        link && (
          <Link href={link} className="mt-2 d-inline-block">
            View Publication
          </Link>
        )
      }
    </div>
  );
};
