import React from 'react';
import { CONTENT_LANG } from '@lib/constants/app';
import '@styles/main.scss';
import { Navbar } from '@components/common/navbar';

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang={CONTENT_LANG} data-bs-theme="light">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
