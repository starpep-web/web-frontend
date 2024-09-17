import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  children: string
  className?: string
}

export const Markdown: React.FC<Props> = ({ children, className }) => {
  return (
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
};
