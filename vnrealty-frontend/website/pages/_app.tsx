import "../styles/globals.scss";
import "../helpers/materials/_variables.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import favicon from '../assets/images/favicon.ico';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="VN Realty" />
        <link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
