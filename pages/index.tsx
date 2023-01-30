import Image from "next/image";
import { useEffect, useRef } from "react";
import Intro from "../components/Intro";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import formatTxt from "../lib/functions/formatTxt";
import dynamic from "next/dynamic";

const Works = dynamic(() => import("../components/Works"), {
  ssr: false,
});

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  return (
    <>
      <Intro
        title={props.home.titre}
        image={props.home.image}
        titleEnter={props.home.titreEntrer}
        textEnter={props.home.texteEntrer}
      />
      <Works props={props}></Works>
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
