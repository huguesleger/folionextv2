import Image from "next/image";
import { useEffect, useRef } from "react";
import Intro from "../components/Intro";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import formatTxt from "../lib/functions/formatTxt";

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  return (
    <>
      <div className="intro container">
        <Intro
          title={props.home.titre}
          image={props.home.image}
          titleEnter={props.home.titreEntrer}
          textEnter={props.home.texteEntrer}
        />
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_HOME)) as GraphQLResponse.HomePage;
  return {
    props: {
      home: res.home,
    },
  };
}
