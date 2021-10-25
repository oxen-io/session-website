import '@/styles/globals.css';

import { AppProps } from 'next/app';
import { ScreenProvider } from '@/contexts/screen';
import lockPageTitle from '@/utils/lockPageTitle';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000, {});
}

function MyApp({ Component, pageProps }: AppProps) {
  lockPageTitle();
  return (
    <ScreenProvider>
      <Component {...pageProps} />
    </ScreenProvider>
  );
}

export default MyApp;
