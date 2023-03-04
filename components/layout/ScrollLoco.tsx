import React, { ReactNode, useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRouter } from "next/router";

type ScrollType = {
  children: ReactNode;
};

const ScrollLoco = ({ children }: ScrollType): JSX.Element => {
  const asPath = useRouter();
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[]}
      location={asPath}
      onLocationChange={(scroll: any) => {
        scroll.scrollTo(0, {
          duration: 800,
          disableLerp: true,
        });
        const intro = document.querySelector(".intro");
        setTimeout(() => {
          intro?.classList.add("is-show");
        }, 1500);
      }}
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        {children}
      </main>
    </LocomotiveScrollProvider>
  );
};

export default ScrollLoco;
