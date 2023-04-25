import React from 'react';
import { AppProps } from 'next/app';
import '@styles/main.scss';
import '@lib/icons';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
