import React from 'react';
import { CONTENT_LANG } from '@lib/constants/app';
import '@styles/main.scss';

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang={CONTENT_LANG} data-theme="light">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
