import React, { useContext, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Context } from "../../context/AppContext";
import { request } from "../../lib/datocms/datocms";
import Query from "../../lib/datocms/queries";
import { GraphQLResponse } from "../../lib/datocms/types";
import SplittingWrapperWord from "../../components/splitting/SplittingWrapperWord";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

const AllWork = dynamic(() => import("../../components/Project"), {
  ssr: false,
});

const ProjetPage: NextPage = (props) => {
  const { setPageName } = useContext(Context);
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props.projets;
  const transitionEnter = useRef(null);

  useEffect(() => {
    setPageName("page-projects");
    const tl = gsap.timeline();
    tl.to(transitionEnter.current, {
      "clip-path": "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      ease: "Power2.easeOut",
      duration: 1.25,
      delay: 8,
    });
  }, []);
  return (
    <div className="content-projects" data-scroll-section>
      <div className="wrapper">
        <div className="container">
          <div className="wrap-content">
            <h1 className="title-page-projects">Réalisations</h1>
            <div className="wrap-titles">
              {projets.map((el, index) => {
                return (
                  <div
                    className={
                      index === 0 ? "inner-title is-active" : "inner-title"
                    }
                    key={el.id}
                  >
                    <Link
                      href={`/projets/${el.slug}`}
                      className="title-project"
                      data-cursor-dark
                    >
                      <SplittingWrapperWord>{el.titre}</SplittingWrapperWord>
                    </Link>
                  </div>
                );
              })}
            </div>
            <h3 className="subtitle-page-projects">
              Développement front-end - Webdesign - Intégration web - Graphisme
            </h3>
            <div className="inner-pagination">
              <div className="pagination-number number-first">
                0<span>1</span>
              </div>
              <div className="pagination-bar">
                <div className="bar-line"></div>
              </div>
              <div className="pagination-number number-last">
                0{projets.length}
              </div>
            </div>
            <div className="inner-scroll">
              <span className="arrow-scroll">
                <Image
                  src="/images/arrow-enter.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </span>
              <p>scroll</p>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-projects">
        <AllWork props={props}></AllWork>
        <div className="transition-enter-canvas" ref={transitionEnter}></div>
      </div>
    </div>
  );
};

export default ProjetPage;

export async function getStaticProps() {
  const res = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  return {
    props: {
      projets: (res && res.allProjets) || [],
    },
  };
}
