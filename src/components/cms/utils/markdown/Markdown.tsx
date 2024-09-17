import React from 'react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import rehypeRaw from 'rehype-raw';
import styles from './Markdown.module.scss';

interface Props {
  children: string
  className?: string
}

export const Markdown: React.FC<Props> = ({ children, className }) => {
  return (
    <ReactMarkdown className={clsx(styles.markdown, className)} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
};
