import Image from "next/image";
import React from "react";

type CardType = {
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

const SectionCards = ({ image }: CardType): JSX.Element => {
  return (
    <div className="card">
      <Image
        className="img-cover"
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
        priority
      />
    </div>
  );
};

export default SectionCards;
