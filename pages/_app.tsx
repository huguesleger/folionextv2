import "../scss/main.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import ScrollLoco from "../components/layout/ScrollLoco";
import Cursor from "../components/layout/Cursor";
import { Context } from "../context/AppContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [pageName, setPageName] = useState("");
  const [currentItemSlider, setCurrentItemSlider] = useState(0);

  const handlePageName = (value: string) => {
    setPageName(value);
  };

  const handleItemValue = (value: number) => {
    setCurrentItemSlider(value);
  };

  const appValue = {
    pageName,
    setPageName: handlePageName,
    currentItemSlider,
    setCurrentItemSlider: handleItemValue,
  };

  return (
    <>
      <Context.Provider value={appValue}>
        <Cursor />
        <Layout>
          <ScrollLoco>
            <Component {...pageProps} />
          </ScrollLoco>
        </Layout>
      </Context.Provider>
    </>
  );
}
