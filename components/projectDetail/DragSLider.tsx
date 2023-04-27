import Image from "next/image";
import React from "react";

type DragType = {
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

const DragSLider = ({ image }: DragType): JSX.Element => {
  return (
    <Image
      className="img-cover"
      width={image.width}
      height={image.height}
      src={image.url}
      alt={image.alt}
    />
  );
};

export default DragSLider;
