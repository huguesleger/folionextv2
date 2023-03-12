import React, { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Bio from "../components/about/Bio";
import CircleText from "../components/about/CircleText";
import SplittingWrapperWord from "../components/splitting/SplittingWrapperWord";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";

const APropos: (props: { about: GraphQLResponse.About }) => JSX.Element =
  (props: { about: GraphQLResponse.About }) => {
    const { scroll } = useLocomotiveScroll();
    let scrollTarget = 0;

    useEffect(() => {
      const txt = document.querySelectorAll(".circles-text");
      if (scroll) {
        scroll.on("scroll", () => {
          scrollTarget = scroll.scroll.instance.scroll.y / 10;
          txt.forEach((el: any) => {
            el.style.transform = "rotate(" + scrollTarget + "deg)";
          });
        });
      }
    }, [scroll]);

    return (
      <div className="page-about">
        <div className="wrapper" data-scroll-section>
          <div className="container">
            <div className="wrap-title">
              <h1 className="title-about" data-scroll>
                <span
                  className="title-1"
                  data-scroll
                  data-scroll-speed="3"
                  data-scroll-position="top"
                >
                  <SplittingWrapperWord>
                    {props.about.titre}
                  </SplittingWrapperWord>
                </span>
                <span
                  className="title-2"
                  data-scroll
                  data-scroll-speed="2"
                  data-scroll-position="top"
                >
                  <SplittingWrapperWord>
                    {props.about.titre2}
                  </SplittingWrapperWord>
                </span>
              </h1>
            </div>
          </div>
        </div>
        <section className="section-bio" data-scroll-section>
          <Bio
            title={props.about.titreBio}
            desc={props.about.texteBio}
            icon={props.about.iconBio}
            image={props.about.imageBio}
          />
        </section>
        <section className="section-circle-txt" data-scroll-section>
          <div className="wrapper">
            <div className="container">
              <CircleText
                txt={props.about.texteCircle[0].texte}
                txt2={props.about.texteCircle[1].texte}
                txt3={props.about.texteCircle[2].texte}
                txt4={props.about.texteCircle[3].texte}
              />
            </div>
          </div>
        </section>
      </div>
    );
  };

export default APropos;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_ABOUT)) as GraphQLResponse.AboutPage;
  return {
    props: {
      about: res.about,
    },
  };
}
