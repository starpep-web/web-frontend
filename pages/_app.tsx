import React from 'react';
import { AppProps } from 'next/app';
import 'bulma/css/bulma.min.css';
import '@styles/main.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
