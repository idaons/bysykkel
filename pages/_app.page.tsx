import "../styles/GlobalStyle";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import "../styles/reset.css";
import Head from "next/head";

if (
  process.env.NEXT_PUBLIC_MOCKDATA === "true" &&
  typeof window !== "undefined"
) {
  const { worker } = require("../mocks/browser");
  worker.start();
}

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
