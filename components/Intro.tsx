import Image from "next/image";
import React from "react";
import formatTxt from "../lib/functions/formatTxt";

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
  return (
    <>
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
          alt={image.alt}
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
            />
          </div>
          <div className="inner-enter">
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
    </>
  );
};

export default Intro;
