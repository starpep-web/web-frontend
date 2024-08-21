import React from 'react';
import Link from 'next/link';

interface Props {
  text: string | null
  title?: string | null
  url: string
  icon: React.ReactNode
  className?: string
}

export const GenericShareButton: React.FC<Props> = ({ text, title, url, icon, className }) => {
  return (
    <Link className={className} href={url} title={title ?? ''}>
      {icon}

      {
        text && (
          <span>
            {text}
          </span>
        )
      }
    </Link>
  );
};
