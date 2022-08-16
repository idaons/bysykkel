import "../styles/GlobalStyle";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import "../styles/reset.css";

import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Bysykler i Oslo</title>
        <meta
          name="description"
          content="Liste over tilgjengelige sykler og låser"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
