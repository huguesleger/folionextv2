import React, { useContext, useEffect, useRef } from "react";
import { StructuredText } from "react-datocms";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Bio from "../components/about/Bio";
import CircleText from "../components/about/CircleText";
import CompetenceItem from "../components/about/Competences/CompetenceItem";
import CompetenceItemList from "../components/about/Competences/CompetenceItemList";
import CompetenceTitle from "../components/about/Competences/CompetenceTitle";
import ListCursus from "../components/about/ListCursus";
import Footer from "../components/layout/Footer";
import SplittingWrapperWord from "../components/splitting/SplittingWrapperWord";
import { Context } from "../context/AppContext";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const APropos: (props: { about: GraphQLResponse.About }) => JSX.Element =
  (props: { about: GraphQLResponse.About }) => {
    const { setPageName } = useContext(Context);

    const rounded = useRef<HTMLDivElement>(null);
    const contact = useRef<HTMLDivElement>(null);

    const { scroll } = useLocomotiveScroll();
    let scrollTarget = 0;

    useEffect(() => {
      setPageName("page-about");

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

    useEffect(() => {
      const windowWidth = window.innerWidth;
      let heightRound: any;
      if (windowWidth >= 1200) {
        heightRound = 94;
      } else {
        heightRound = 35;
      }
      scroll?.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
      if (scroll) {
        ScrollTrigger.addEventListener("refresh", () => scroll.update());
        ScrollTrigger.defaults({ scroller: "[data-scroll-container]" });
        gsap.set(rounded.current, {
          height: heightRound,
        });
        gsap.to(rounded.current, {
          scrollTrigger: {
            trigger: contact.current,
            scrub: 0,
            start: "0% 100%",
            end: "100% 100%",
          },
          height: 0,
          ease: "none",
        });
        ScrollTrigger.refresh();
      }
    }, [scroll, rounded.current]);

    return (
      <>
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
        <section className="section-cursus" data-scroll-section>
          <div className="wrapper">
            <div className="container">
              <div className="inner-title">
                <h2 className="section-title" data-scroll data-scroll-speed="2">
                  {props.about.titreCursus}
                </h2>
              </div>
              <div className="list-cursus" data-scroll data-scroll-speed="3">
                {props.about.listeCursus.map((el) => {
                  return (
                    <div className="wrap-list-item" key={el.id}>
                      <ListCursus
                        data-scroll
                        titre={el.titre}
                        school={el.ecole}
                        annee={el.annee}
                        image={el.image.url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="section-competences" data-scroll-section>
          <div className="infinite-keywords">
            <h3 className="keywords">
              {props.about.titreCompetence.map((el) => {
                return (
                  <CompetenceTitle
                    title={el.titre}
                    icon={el.icon}
                    key={el.id}
                  />
                );
              })}
            </h3>
            <span className="keywords">
              {props.about.titreCompetence.map((el) => {
                return (
                  <CompetenceTitle
                    title={el.titre}
                    icon={el.icon}
                    key={el.id}
                  />
                );
              })}
            </span>
          </div>
          <div className="wrapper">
            <div className="container">
              <div className="wrap-items">
                {props.about.listeCompetence.map((el) => {
                  return (
                    <CompetenceItem
                      key={el.id}
                      title={el.titre}
                      icon={el.icon}
                      number={el.number}
                    >
                      <StructuredText data={el.description} />
                    </CompetenceItem>
                  );
                })}
                {props.about.listeCompetenceItems.map((el) => {
                  return (
                    <CompetenceItem
                      key={el.id}
                      title={el.titre}
                      icon={el.icon}
                      number={el.number}
                    >
                      <div className="list-items">
                        <ul>
                          {el.listeServiceLeft.map((item) => {
                            return (
                              <CompetenceItemList
                                key={item.id}
                                texte={item.texte}
                              />
                            );
                          })}
                        </ul>
                        <ul>
                          {el.listeServiceCenter.map((item) => {
                            return (
                              <CompetenceItemList
                                key={item.id}
                                texte={item.texte}
                              />
                            );
                          })}
                        </ul>
                        <ul>
                          {el.listeServiceRight.map((item) => {
                            return (
                              <CompetenceItemList
                                key={item.id}
                                texte={item.texte}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    </CompetenceItem>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <div className="wrap-rounded" data-scroll-section>
          <div className="inner-rounded" ref={rounded}>
            <div className="rounded"></div>
          </div>
        </div>
        <div
          className="section-contact"
          ref={contact}
          data-scroll-section
          data-scroll
        >
          <div className="wrapper">
            <div className="container">
              <div className="inner-contact">
                <div
                  className="wrap-content"
                  data-scroll
                  data-scroll-speed="-4"
                  data-scroll-position="bottom"
                >
                  <div className="inner-title" data-scroll>
                    <h2
                      className="title-contact"
                      data-scroll
                      data-scroll-speed="3"
                    >
                      {props.about.titreContact}
                    </h2>
                  </div>
                  <div className="wrap-email">
                    <Link
                      className="email"
                      data-cursor-label="click"
                      href={`mailto:${props.about.emailContact}`}
                    >
                      {props.about.emailContact}
                    </Link>
                  </div>
                </div>
                <div className="inner-footer">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
