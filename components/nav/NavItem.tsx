import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import SplittingWrapperWord from "../splitting/SplittingWrapperWord";
import gsap from "gsap";
import { useEffect } from "react";

type Item = {
  image: string;
  slug: string;
  name: string;
};

const NavItem = ({ name, image, slug }: Item): JSX.Element => {
  const router = useRouter();

  const navLink = useRef(null);
  const hoverImg = useRef(null);
  const shadow = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    tl.set(hoverImg.current, {
      scale: 1.3,
      opacity: 0,
    }).set(shadow.current, {
      opacity: 0,
    });
  }, []);

  const mouseEnter = () => {
    tl.to(hoverImg.current, {
      opacity: 0.4,
      scale: 1,
      duration: 0.5,
      ease: "Power2.easeInOut",
      onStart: () => {
        gsap.to(shadow.current, {
          opacity: 0.6,
          duration: 0.3,
          ease: "Power2.easeInOut",
        });
      },
    });
  };

  const mouseLeave = () => {
    tl.to(hoverImg.current, {
      opacity: 0,
      scale: 1.3,
      duration: 0.5,
      ease: "Power2.easeInOut",
      onStart: () => {
        gsap.to(shadow.current, {
          opacity: 0,
          duration: 0.3,
          ease: "Power2.easeInOut",
        });
      },
    });
  };

  return (
    <Link
      ref={navLink}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={
        router.pathname === (slug as string) ? "nav-link is-active" : "nav-link"
      }
      href={slug}
    >
      <SplittingWrapperWord>{name}</SplittingWrapperWord>
      <div className="hover-item">
        <div className="hover-inner">
          <div className="shadow" ref={shadow}></div>
          <div
            className="hover-img"
            ref={hoverImg}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};
export default NavItem;
