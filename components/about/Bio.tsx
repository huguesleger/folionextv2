import Image from "next/image";
import React from "react";
import { StructuredText } from "react-datocms";

type BioType = {
  title: string;
  desc: any;
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
  icon: string;
};

const Bio = ({ title, desc, image, icon }: BioType): JSX.Element => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="wrap-content">
          <div className="col-txt">
            <div className="inner-title" data-scroll>
              <h2 className="section-title" data-scroll data-scroll-speed="3">
                {title}
                <span className="icon-emoji">{icon}</span>
              </h2>
            </div>
            <div className="inner-txt" data-scroll>
              <div className="font-18" data-scroll data-scroll-speed="2">
                <StructuredText data={desc} />
              </div>
            </div>
          </div>
          <div className="col-img">
            <div className="inner-img">
              <Image
                className="img-responsive"
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                data-scroll
                data-scroll-speed="-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
