import React from 'react';
import { AppProps } from 'next/app';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
