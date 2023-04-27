import Image from "next/image";
import React from "react";

type IdentityImageType = {
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

const IdentityImage = ({ image }: IdentityImageType): JSX.Element => {
  return (
    <div className="block-img">
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
      />
    </div>
  );
};

export default IdentityImage;
