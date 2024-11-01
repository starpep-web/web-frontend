import React from 'react';
import Image from 'next/image';
import { Maybe } from '@lib/utils/types';
import { getStrapiMedia } from '@lib/services/strapi/utils/media';

interface Props {
  className?: string
  loading?: 'eager' | 'lazy'

  url?: string
  alternativeText?: Maybe<string>
  width?: Maybe<number>
  height?: Maybe<number>
}

export const StrapiImage: React.FC<Props> = ({ className, loading, url, alternativeText, width, height }) => {
  const imageUrl = getStrapiMedia(url);
  const altText = alternativeText || 'image';

  const imageWidth = width || 1000;
  const imageHeight = height || 1000;

  if (!imageUrl) {
    return null;
  }

  return (
    <Image
      className={className}
      loading={loading}
      src={imageUrl}
      alt={altText}
      width={imageWidth}
      height={imageHeight}
    />
  );
};
