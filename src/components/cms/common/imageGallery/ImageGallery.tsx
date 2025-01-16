'use client';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import clsx from 'clsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Maybe } from '@lib/utils/types';
import { StrapiImage } from '@components/cms/utils/strapiImage';
import styles from './ImageGallery.module.scss';

const CastSlider = Slider as unknown as React.JSXElementConstructor<Settings & { style: React.CSSProperties }>;

interface Props {
  className?: string
  imageClassName?: string
  featured?: boolean
  images?: Maybe<{
    data: {
      attributes: Maybe<{
        url: string
        alternativeText?: Maybe<string>
        width?: Maybe<number>
        height?: Maybe<number>
      }>
    }[]
  }>
}

export const ImageGallery: React.FC<Props> = ({ className, imageClassName, featured, images }) => {
  const maxImageHeight = images?.data.reduce((max, cur) => {
    const height = cur.attributes?.height ?? 0;
    return max < height ? height : max;
  }, 0);

  if (!images || !images.data.length) {
    return null;
  }

  return (
    <section className={className}>
      <CastSlider
        className={clsx('mb-5', featured && styles.featured)}
        style={{
          height: featured ? `${maxImageHeight}px` : undefined
        }}
        draggable
        autoplay={false}
        autoplaySpeed={5000}
        pauseOnHover
        dots
        arrows={false}
        lazyLoad="progressive"
        centerMode={false}
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        swipeToSlide
        accessibility
      >
        {
          images.data.map((image, idx) => image && (
            <div key={idx} className="w-100">
              <div
                className={clsx(featured && styles.featured)}
                style={{
                  height: featured ? `${maxImageHeight}px` : undefined
                }}
              >
                <StrapiImage
                  className={clsx('w-100 h-100 object-fit-contain', imageClassName)}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  {...image.attributes}
                />
              </div>
            </div>
          ))
        }
      </CastSlider>
    </section>
  );
};
