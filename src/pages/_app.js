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
import { useEffect } from 'react';

// Create an Emotion cache for SSR
const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarAndFooter = ['/auth/signin', '/auth/signup'].includes(router.pathname);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Google Analytics route change tracking
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return; // Skip if no ID is provided
    const handleRouteChange = (url) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={cache}>
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand&family=Inter&display=swap" rel="stylesheet" />
            {/* Google Analytics GA4 Script */}
            {GA_MEASUREMENT_ID && (
              <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_MEASUREMENT_ID}');
                    `,
                  }}
                />
              </>
            )}
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
