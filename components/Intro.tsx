import Image from "next/image";
import React, { useRef } from "react";
import formatTxt from "../lib/functions/formatTxt";
import gsap from "gsap";

type IntroType = {
  title: string;
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
  titleEnter: string;
  textEnter: string;
};

const Intro = ({
  title,
  image,
  titleEnter,
  textEnter,
}: IntroType): JSX.Element => {
  const intro = useRef<HTMLDivElement>(null);

  const onClick = () => {
    const works = document.querySelector(".works");
    const tl = gsap.timeline();

    tl.to(intro.current, {
      yPercent: -150,
      rotate: -8,
      opacity: 0,
      duration: 1.2,
      ease: "Power2.ease",
      delay: 0.3,
      onComplete: () => {
        if (intro.current !== null) {
          intro.current.classList.remove("is-show");
        }
        tl.to(works, {
          opacity: 1,
          visibility: "visible",
          delay: 0.6,
          duration: 0.8,
          ease: "Power2.ease",
        });
      },
    });
  };
  return (
    <div className="intro container" ref={intro}>
      <div className="wrap-title">
        <div className="inner-title">
          <h1 className="title">{formatTxt(title)}</h1>
        </div>
      </div>
      <div className="inner-img">
        <Image
          className="img-intro"
          src={image.url}
          width={image.width}
          height={image.height}
          // alt={image.alt}
          alt="toto"
        />
      </div>
      <div className="block-bottom">
        <div className="wrap-enter">
          <div className="inner-arrow">
            <Image
              src="/images/arrow-enter.svg"
              width={90}
              height={90}
              alt="entrez"
              priority
            />
          </div>
          <div className="inner-enter" onClick={onClick}>
            <span className="title-enter">{formatTxt(titleEnter)}</span>
            <span className="txt-enter">{formatTxt(textEnter)}</span>
          </div>
        </div>
        <div className="wrap-name">
          <h2 className="name">
            Hugues <span>Leger</span>
          </h2>
          <div className="city">
            <Image
              src="/images/mtp.svg"
              width={120}
              height={120}
              alt="montpellier"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
