import React from 'react';
import { CONTENT_LANG } from '@lib/constants/app';
import { Navbar } from '@components/common/navbar';
import { Footer } from '@components/common/footer';
import '@styles/main.scss';

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
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
