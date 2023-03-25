import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { Context } from "../context/AppContext";

const ProjetPage: NextPage = (props) => {
  const { setPageName } = useContext(Context);

  useEffect(() => {
    setPageName("page-projects");
  }, []);
  return (
    <div data-scroll-section>
      <h1>hello</h1>
    </div>
  );
};

export default ProjetPage;
