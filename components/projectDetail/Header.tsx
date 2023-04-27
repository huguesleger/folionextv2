import Image from "next/image";
import React from "react";

type HeaderType = {
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

const Header = ({ image }: HeaderType): JSX.Element => {
  return (
    <div className="header-project" data-scroll-section>
      <div className="inner-header">
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="img-cover"
        />
      </div>
    </div>
  );
};

export default Header;
