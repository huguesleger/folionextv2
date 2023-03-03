import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "../nav/NavItem";

const NavBar = (): JSX.Element => {
  const headerContent = useRef<HTMLDivElement>(null);
  const btnMain = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const social = useRef<HTMLDivElement>(null);
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleToggleBtn = () => {
    setToggleBtn(!toggleBtn);
  };

  useEffect(() => {
    const linkChar = document.querySelectorAll(
      ".nav-item .nav-link .wrapper-word .char"
    );
    const linkWrapper = document.querySelectorAll(
      ".nav-item .nav-link .wrapper-word"
    );

    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };
    const tl = gsap.timeline();

    if (toggleBtn === true) {
      nav.current?.classList.add("is-open");
      btnMain.current?.classList.add("is-open");
      headerContent.current?.classList.add("hide-el");

      tl.set(linkChar, {
        yPercent: 100,
        opacity: 0,
      })
        .set(linkWrapper, {
          yPercent: 0,
          opacity: 1,
        })
        .set(social.current, {
          opacity: 0,
        })
        .to(linkChar, {
          yPercent: 0,
          opacity: 1,
          delay: 0.5,
          ease: "Power2.easeInOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
          onStart: () => {
            gsap.to(social.current, {
              opacity: 1,
              duration: 0.4,
              ease: "Power2.easeInOut",
              delay: 0.5,
            });
          },
        });
    } else {
      tl.to(linkWrapper, {
        yPercent: -100,
        opacity: 0,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onStart: () => {
          gsap.to(social.current, {
            opacity: 0,
            duration: 0.4,
            ease: "Power2.easeInOut",
          });
        },
        onComplete: () => {
          nav.current?.classList.remove("is-open");
          btnMain.current?.classList.remove("is-open");
          headerContent.current?.classList.remove("hide-el");
        },
      });
    }
  }, [toggleBtn]);

  const handleClick = () => {
    setToggleBtn(false);
  };

  return (
    <>
      <header className="header">
        <div className="wrapper">
          <div className="header-content container" ref={headerContent}>
            <Link className="logo" href="/">
              <Image src="/logo-hl.svg" width={30} height={30} alt="HL" />
            </Link>
            <div className="wrap-name">
              <div className="name">Hugues Leger</div>
              <div className="name-hover">
                <i className="far fa-copyright" aria-hidden></i> HL 2023. Tous
                droit réservés
              </div>
            </div>
            <div className="wrap-right">
              <button className="btn btn-effect btn-theme-mode">
                <span>
                  <span>mode sombre</span>
                </span>
              </button>
              <div className="header-btn">
                <div
                  className="btn-main"
                  ref={btnMain}
                  onClick={handleToggleBtn}
                >
                  <span className="main-bar"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="nav" ref={nav}>
        <div className="nav-rounded">
          <div className="rounded-top">
            <div className="rounded"></div>
          </div>
          <div className="container">
            <nav className="nav-items">
              <ul className="inner-nav-items">
                <li className="nav-item">
                  <NavItem
                    name={"Accueil"}
                    slug={"/"}
                    image={"/images/img-2.jpg"}
                    click={handleClick}
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"Projets"}
                    slug={"/projets"}
                    image={"/images/img-3.jpg"}
                    click={handleClick}
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"A propos"}
                    slug={"/a-propos"}
                    image={"/images/img-4.jpg"}
                    click={handleClick}
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"Contact"}
                    slug={"/contact"}
                    image={"/images/img-5.jpg"}
                    click={handleClick}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <div className="nav-social" ref={social}>
            <div className="container">
              <ul className="inner-social">
                <li className="social-icon">
                  <Link className="btn-progress btn-social" href="#">
                    <svg
                      aria-hidden="true"
                      className="progress"
                      width="70"
                      height="70"
                      viewBox="0 0 70 70"
                    >
                      <path
                        className="progress-path"
                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                        pathLength="1"
                      />
                    </svg>
                    <i className="fab fa-facebook-f" aria-hidden></i>
                  </Link>
                </li>
                <li className="social-icon">
                  <Link className="btn-progress btn-social" href="#">
                    <svg
                      aria-hidden="true"
                      className="progress"
                      width="70"
                      height="70"
                      viewBox="0 0 70 70"
                    >
                      <path
                        className="progress-path"
                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                        pathLength="1"
                      />
                    </svg>
                    <i className="fab fa-linkedin-in" aria-hidden></i>
                  </Link>
                </li>
                <li className="social-icon">
                  <Link className="btn-progress btn-social" href="#">
                    <svg
                      aria-hidden="true"
                      className="progress"
                      width="70"
                      height="70"
                      viewBox="0 0 70 70"
                    >
                      <path
                        className="progress-path"
                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                        pathLength="1"
                      />
                    </svg>
                    <i className="fab fa-instagram" aria-hidden></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
