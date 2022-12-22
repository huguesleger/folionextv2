import "../scss/main.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import ScrollLoco from "../components/layout/ScrollLoco";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ScrollLoco>
        <Component {...pageProps} />
      </ScrollLoco>
    </Layout>
  );
}
