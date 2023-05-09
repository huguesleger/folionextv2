import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { SharedLayoutDataContext } from "../../context/MotionContext";

type HeaderType = {
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const Header = ({ image }: HeaderType): JSX.Element => {
  const { contextValue, current } = useContext(SharedLayoutDataContext);
  const { x, y, width, height } = contextValue;

  console.log(current, "currentPage");
  console.log(contextValue, "contextValue");

  return (
    <div className="header-project" data-scroll-section>
      <motion.div
        className="inner-header"
        initial={{
          y: y,
          x: x,
          width: width,
          height: height,
        }}
        animate={{
          y: 0,
          x: 0,
          width: "100%",
          height: "100%",
          transition: { delay: 0, ...transition },
        }}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="img-cover"
        />
      </motion.div>
    </div>
  );
};

export default Header;
