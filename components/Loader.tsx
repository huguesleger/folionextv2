import React, { useEffect, useRef } from "react";
import ChangeWord from "./ChangeWord";
import gsap from "gsap";

const Loader = () => {
  const loader = useRef(null);

  useEffect(() => {
    const intro = document.querySelector(".intro");
    const tl = gsap.timeline();
    tl.to(loader.current, {
      delay: 7,
      opacity: 0,
      pointerEvents: "none",
      ease: "Power2.easeInOut",
      duration: 0.5,
      visibility: "hidden",
      onComplete: () => {
        if (intro) {
          intro.classList.add("is-show");
        }
      },
    });
  }, []);

  return (
    <div className="loader-wrapper" ref={loader}>
      <div className="loader">
        <div className="loader-inner">
          <div className="wrap-words">
            <ChangeWord
              word1={"Hello"}
              word2={"En cours de chargement"}
              word3={"Salut"}
              word4={"Patience ça arrive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
