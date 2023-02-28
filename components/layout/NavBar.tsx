import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "../nav/NavItem";

const NavBar = (): JSX.Element => {
  const btnMain = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);
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

      tl.set(linkChar, {
        yPercent: 100,
        opacity: 0,
      })
        .set(linkWrapper, {
          yPercent: 0,
          opacity: 1,
        })
        .to(linkChar, {
          yPercent: 0,
          opacity: 1,
          delay: 0.5,
          ease: "Power2.easeInOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        });
    } else {
      tl.to(linkWrapper, {
        yPercent: -100,
        opacity: 0,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onComplete: () => {
          nav.current?.classList.remove("is-open");
          btnMain.current?.classList.remove("is-open");
        },
      });
    }
  }, [toggleBtn]);

  return (
    <>
      <header className="header">
        <div className="header-content container">
          <Link className="logo" href="/">
            <Image src="/logo-hl.svg" width={30} height={30} alt="HL" />
          </Link>
          <div className="wrap-name">
            <div className="name">Hugues Leger</div>
            <div className="name-hover">Hugues Leger</div>
          </div>
          <div className="wrap-right">
            <button className="btn btn-effect btn-theme-mode">
              <span>
                <span>mode sombre</span>
              </span>
            </button>
            <div className="header-btn">
              <div className="btn-main" ref={btnMain} onClick={handleToggleBtn}>
                <span className="main-bar"></span>
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
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"Projets"}
                    slug={"/projets"}
                    image={"/images/img-3.jpg"}
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"A propos"}
                    slug={"/a-propos"}
                    image={"/images/img-4.jpg"}
                  />
                </li>
                <li className="nav-item">
                  <NavItem
                    name={"Contact"}
                    slug={"/contact"}
                    image={"/images/img-5.jpg"}
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
