import "../scss/main.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import ScrollLoco from "../components/layout/ScrollLoco";
import Cursor from "../components/layout/Cursor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Cursor />
      <Layout>
        <ScrollLoco>
          <Component {...pageProps} />
        </ScrollLoco>
      </Layout>
    </>
  );
}
