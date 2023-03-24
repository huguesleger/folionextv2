import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Intro from "../components/Intro";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import formatTxt from "../lib/functions/formatTxt";
import dynamic from "next/dynamic";
import Link from "next/link";
import SplittingWrapperWord from "../components/splitting/SplittingWrapperWord";
import { Context } from "../context/AppContext";

const Work = dynamic(() => import("../components/Works"), {
  ssr: false,
});

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props.projets;
  const { setPageName } = useContext(Context);

  useEffect(() => {
    setPageName("page-home");
  }, []);

  return (
    <>
      <Intro
        title={props.home.titre}
        image={props.home.image}
        titleEnter={props.home.titreEntrer}
        textEnter={props.home.texteEntrer}
      />
      <div className="works">
        <div className="title-works">
          <div className="inner-title">
            <h2 className="title">
              <span>Pro</span>jets
            </h2>
            <span className="subtitle-works">
              {props.home.subtitleLastProject}
            </span>
          </div>
        </div>
        <div className="wrap-titles">
          {projets.map((projet, index) => {
            return (
              <div
                className={index === 0 ? "title-item active" : "title-item"}
                key={index}
              >
                <h3 className="item-link">
                  <SplittingWrapperWord>{projet.titre}</SplittingWrapperWord>
                </h3>
                <div className="item-hover">
                  <SplittingWrapperWord>{projet.titre}</SplittingWrapperWord>
                </div>
              </div>
            );
          })}
        </div>
        <div className="progress-items">
          <div className="inner-items">
            <span className="number-item">
              0<span>1</span>
            </span>
            <span className="separate">-</span>
            <span>0{projets.length}</span>
          </div>
        </div>
        <div className="progress-work">
          <svg height="80" width="80">
            <circle className="circle-line" cx="50%" cy="50%" r="30" />
            <circle className="circle-line-progress" cx="50%" cy="50%" r="30" />
          </svg>
        </div>
        <Work props={props}></Work>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_HOME)) as GraphQLResponse.HomePage;
  const res2 = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;
  return {
    props: {
      home: res.home,
      projets: (res2 && res2.allProjets) || [],
    },
  };
}
