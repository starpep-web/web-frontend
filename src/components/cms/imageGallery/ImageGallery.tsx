'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Maybe } from '@lib/utils/types';
import { StrapiImage } from '@components/cms/strapiImage';

interface Props {
  className?: string
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

export const ImageGallery: React.FC<Props> = ({ className, images }) => {
  if (!images || !images.data.length) {
    return null;
  }

  return (
    <section className={className}>
      <Slider
        className="mb-5"
        draggable
        autoplay
        autoplaySpeed={5000}
        pauseOnHover
        dots
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
              <StrapiImage
                className="w-100 h-100 object-fit-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
                {...image.attributes}
              />
            </div>
          ))
        }
      </Slider>
    </section>
  );
};
