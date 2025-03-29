// pages/_app.js
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/footer';
import { AuthProvider } from '../../context/AuthContext';
import theme from '../styles/theme';
import '../styles/globals.css';

// Create an Emotion cache for SSR
const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarAndFooter = ['/auth/signin', '/auth/signup'].includes(router.pathname);

  return (
    <CacheProvider value={cache}>
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand&family=Inter&display=swap" rel="stylesheet" />
          </Head>
          {!hideNavbarAndFooter && <Navbar />}
          <Component {...pageProps} />
          {!hideNavbarAndFooter && <Footer />}
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};