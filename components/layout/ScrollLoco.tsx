import React, { ReactNode, useContext, useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRouter } from "next/router";
import { Context } from "../../context/AppContext";

type ScrollType = {
  children: ReactNode;
};

const ScrollLoco = ({ children }: ScrollType): JSX.Element => {
  const asPath = useRouter();
  const containerRef = useRef(null);
  const { pageName } = useContext(Context);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[]}
      location={asPath}
      onUpdate={(scroll: any) => {}}
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
      <main data-scroll-container ref={containerRef} className={pageName}>
        {children}
      </main>
    </LocomotiveScrollProvider>
  );
};

export default ScrollLoco;
