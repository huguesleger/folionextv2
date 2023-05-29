import React, { useContext, useEffect, useRef } from "react";
import { request } from "../../lib/datocms/datocms";
import Query from "../../lib/datocms/queries";
import { GraphQLResponse } from "../../lib/datocms/types";
import { Context } from "../../context/AppContext";
import Header from "../../components/projectDetail/Header";
import SectionInfo from "../../components/projectDetail/SectionInfo";
import SectionIdentity from "../../components/projectDetail/SectionIdentity";
import IdentityImage from "../../components/projectDetail/IdentityImage";
import SectionColor from "../../components/projectDetail/SectionColor";
import Image from "next/image";
import SectionDescription from "../../components/projectDetail/SectionDescription";
import SectionTxt from "../../components/projectDetail/SectionTxt";
import { SwiperSlide } from "swiper/react";
import DragSLider from "../../components/projectDetail/DragSLider";
import SectionSlider from "../../components/projectDetail/SectionSlider";
import TexteSlider from "../../components/projectDetail/TexteSlider";
import SectionCards from "../../components/projectDetail/SectionCards";
import TexteCard from "../../components/projectDetail/TexteCard";
import Link from "next/link";
import { StructuredText } from "react-datocms";
import { isEmptyDocument } from "datocms-structured-text-utils";
import Footer from "../../components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import HoverReveal from "../../components/HoverReveal";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail: (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => JSX.Element = (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => {
  const { setPageName } = useContext(Context);
  const rounded = useRef<HTMLDivElement>(null);
  const sectionNext = useRef<HTMLDivElement>(null);
  const transitionProject = useRef<HTMLDivElement>(null);

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    setPageName("page-project-detail");
  }, []);

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
          trigger: sectionNext.current,
          scrub: 0,
          start: "0% 100%",
          end: "100% 100%",
        },
        height: 0,
        ease: "none",
      });
      ScrollTrigger.refresh();
    }
  }, [scroll]);

  const getNextpost = () => {
    const index = props.projets.findIndex(
      (el) => el.slug === props.projet.slug
    );
    if (index === (props.projets && props.projets.length) - 1) {
      return props.projets[0];
    } else {
      return props.projets[index + 1];
    }
  };

  return (
    <>
      <Header image={props.projet.imageSlider} />
      <section
        className={`project-infos ${props.projet.colorText}`}
        data-scroll-section
        style={{ backgroundColor: props.projet.colorSection.hex }}
      >
        <SectionInfo
          titre={props.projet.titre}
          siteWeb={props.projet.siteWeb}
          intervention={props.projet.intervention}
          annee={props.projet.annee}
        />
      </section>
      <section className="section project-desc" data-scroll-section>
        <SectionDescription desc={props.projet.description} />
      </section>
      <section className="section project-design" data-scroll-section>
        <Image
          className="img-cover"
          src={props.projet.imageGraphique.url}
          width={props.projet.imageGraphique.width}
          height={props.projet.imageGraphique.height}
          alt={props.projet.imageGraphique.alt}
          priority
        />
      </section>
      <section className="section project-identity" data-scroll-section>
        <SectionIdentity
          titre={props.projet.titreCharte}
          desc={props.projet.descriptionCharte}
        >
          <div
            className="wrap-img"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
          >
            <div className="inner-img">
              {props.projet.imageCharte.map((el) => {
                return <IdentityImage image={el.image} key={el.id} />;
              })}
            </div>
          </div>
          <div
            className="wrap-img"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-6"
          >
            <div className="inner-img">
              {props.projet.imageCharteBottom.map((el) => {
                return <IdentityImage image={el.image} key={el.id} />;
              })}
            </div>
          </div>
        </SectionIdentity>
      </section>
      <section className="section project-color" data-scroll-section>
        <div className="wrapper">
          <div className="container">
            <div className="wrap-colors">
              <div className="inner-block">
                {props.projet.codeCouleur.map((el, index) => {
                  if (index >= 1) return null;
                  return (
                    <SectionColor
                      key={el.id}
                      color={el.color.hex}
                      colorTxt={el.colorText}
                      titre={el.titre}
                    />
                  );
                })}
                <div className="wrap-block-col">
                  {props.projet.codeCouleur.map((el, index) => {
                    if (index % 3)
                      return (
                        <SectionColor
                          key={el.id}
                          color={el.color.hex}
                          colorTxt={el.colorText}
                          titre={el.titre}
                        />
                      );
                  })}
                </div>
              </div>
              <div className="inner-desc">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium nihil aut necessitatibus sunt iusto nam excepturi,
                  nulla doloribus autem cupiditate ad atque cumque aspernatur
                  dolor obcaecati voluptatem fugit neque nisi?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section project-mobile"
        data-scroll-section
        style={{ backgroundColor: props.projet.colorSectionMobile.hex }}
      >
        <Image
          className="img-responsive"
          src={props.projet.imageTemplateMobile.url}
          width={props.projet.imageTemplateMobile.width}
          height={props.projet.imageTemplateMobile.height}
          alt={props.projet.imageTemplateMobile.alt}
          priority
        />
      </section>
      <section
        className="section project-device"
        data-scroll-section
        style={{ backgroundColor: props.projet.colorSectionMobile.hex }}
      >
        <div className="wrapper">
          <div className="container">
            <div className="wrap-img">
              <Image
                className="img-responsive"
                src={props.projet.imageDevice.url}
                width={props.projet.imageDevice.width}
                height={props.projet.imageDevice.height}
                alt={props.projet.imageDevice.alt}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section project-text" data-scroll-section>
        <SectionTxt txt={props.projet.texteProjet} />
      </section>
      <section
        className="section project-template-desktop-full"
        data-scroll-section
      >
        <Image
          className="img-cover"
          src={props.projet.imageTemplateDesktopFull.url}
          width={props.projet.imageTemplateDesktopFull.width}
          height={props.projet.imageTemplateDesktopFull.height}
          alt={props.projet.imageTemplateDesktopFull.alt}
          priority
        />
      </section>
      <section className="section project-template-desktop" data-scroll-section>
        <div className="wrapper">
          <div className="container">
            <div className="wrap-img">
              <Image
                className="img-responsive"
                src={props.projet.imageTemplateDesktop.url}
                width={props.projet.imageTemplateDesktop.width}
                height={props.projet.imageTemplateDesktop.height}
                alt={props.projet.imageTemplateDesktop.alt}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {props.projet.imageCard.length >= 1 && (
        <section className="section project-card" data-scroll-section>
          <div className="wrapper">
            <div className="container">
              <TexteCard txt={props.projet.texteImageCard} />
              <div className="wrap-cards">
                {props.projet.imageCard.map((el) => {
                  return <SectionCards key={el.id} image={el.image} />;
                })}
              </div>
            </div>
          </div>
        </section>
      )}
      {props.projet.imagePage.length >= 4 && (
        <section className="section project-slider" data-scroll-section>
          {!isEmptyDocument(props.projet.texteSlider) && (
            <TexteSlider txt={props.projet.texteSlider} />
          )}
          <SectionSlider>
            {props.projet.imagePage.map((el, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="inner-img">
                    <DragSLider image={el.image} />
                  </div>
                </SwiperSlide>
              );
            })}
          </SectionSlider>
        </section>
      )}
      <div className="wrap-rounded" data-scroll-section>
        <div className="inner-rounded" ref={rounded}>
          <div className="rounded"></div>
        </div>
      </div>
      <section className="project-next" ref={sectionNext} data-scroll-section>
        <div className="wrapper">
          <div className="content-next">
            <div className="wrap-link">
              <HoverReveal
                image={getNextpost().imageSlider.url}
                widthImage={"150"}
                heightImage={"220"}
              >
                <p className="title-project-next">Projet Suivant</p>
                <Link
                  className="link-next-project"
                  href={`/projets/${getNextpost().slug}`}
                >
                  <span data-cursor-label="Voir le projet">
                    {getNextpost().titre}
                  </span>
                </Link>
              </HoverReveal>
            </div>
            <div className="inner-footer">
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;

export const getStaticPaths = async () => {
  const res = (await request(
    Query.QUERY_SLUGS_PROJETS
  )) as GraphQLResponse.AllProjets;

  const paths = res.allProjets.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// @ts-ignore
export async function getStaticProps({ params }) {
  const res = (await request(Query.QUERY_PROJET_BY_SLUG, {
    slug: params.slug,
  })) as GraphQLResponse.Projet;
  const resAll = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  if (!res) {
    return {
      redirect: {
        destination: "/projets",
        permanent: false,
      },
    };
  }

  return {
    props: {
      projet: res.projet,
      projets: (resAll && resAll.allProjets) || [],
    },
    revalidate: 1,
  };
}
