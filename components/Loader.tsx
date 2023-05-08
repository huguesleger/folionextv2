import React, { useEffect, useRef } from "react";
import ChangeWord from "./ChangeWord";
import gsap from "gsap";

const Loader = () => {
  const loader = useRef<HTMLDivElement>(null);
  let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  useEffect(() => {
    const intro = document.querySelector(".intro");
    const tl = gsap.timeline();

    if (localStorage.getItem("preloader") == date.toString()) {
      loader.current?.remove();
      intro?.classList.add("is-show");
    }

    if (localStorage.getItem("preloader") != date.toString()) {
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
      localStorage.setItem("preloader", date.toString());
    }
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
