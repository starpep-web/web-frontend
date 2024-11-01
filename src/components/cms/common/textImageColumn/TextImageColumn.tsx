import React from 'react';
import clsx from 'clsx';
import { Markdown } from '@components/cms/utils/markdown';
import { StrapiImage } from '@components/cms/utils/strapiImage';
import { Maybe } from '@lib/utils/types';

interface Props {
  className?: string
  text?: string
  image?: {
    data: Maybe<{
      attributes: Maybe<{
        url: string
        alternativeText?: Maybe<string>
        width?: Maybe<number>
        height?: Maybe<number>
      }>
    }>
  }
  flip?: boolean
}

export const TextImageColumn: React.FC<Props> = ({ className, text, image, flip }) => {
  return (
    <section className={clsx('w-full d-flex gap-5', flip ? 'flex-column flex-md-row-reverse' : 'flex-column-reverse flex-md-row', className)}>
      <div className="w-100 d-flex align-items-center justify-content-center">
        {
          text && (
            <Markdown className="h-fit">
              {text}
            </Markdown>
          )
        }
      </div>

      <div className="w-100 d-flex align-items-center justify-content-center">
        {
          image && (
            <StrapiImage className="w-100 object-fit-cover" {...image.data?.attributes} />
          )
        }
      </div>
    </section>
  );
};
