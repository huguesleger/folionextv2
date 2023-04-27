import React, { ReactNode } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import gsap from "gsap";

type SliderType = {
  children: ReactNode;
};

const mouseEnter = () => {
  const windowWidth = window.innerWidth;
  const cursor = document.querySelector(".cursor");
  if (windowWidth >= 1200) {
    cursor?.classList.add("has-drag");
  }
};

const mouseLeave = () => {
  const windowWidth = window.innerWidth;
  const cursor = document.querySelector(".cursor");
  if (windowWidth >= 1200) {
    cursor?.classList.remove("has-drag");
  }
};

const SectionSlider = ({ children }: SliderType): JSX.Element => {
  return (
    <div
      className="wrap-slider is-draggable"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={false}
        loop={false}
        grabCursor={false}
        observer={true}
        breakpoints={{
          1024: {
            spaceBetween: 40,
            slidesPerView: 4,
          },
        }}
        onTouchStart={() => {
          const windowWidth = window.innerWidth;
          if (windowWidth >= 1200) {
            document.querySelector("body")?.classList.add("is-draggy");
            const item = document.querySelectorAll(".swiper-slide .inner-img");
            const itemImg = document.querySelectorAll(
              ".swiper-slide .inner-img img"
            );
            const tl = gsap.timeline();
            tl.set(item, {
              duration: 0.3,
              scale: 1,
              ease: "Power2.easeInOut",
            })
              .set(itemImg, {
                duration: 0.3,
                scale: 1,
                ease: "Power2.easeInOut",
              })
              .to(item, {
                duration: 0.3,
                scale: 0.8,
                ease: "Power2.easeInOut",
                onStart: () => {
                  gsap.to(itemImg, {
                    duration: 0.3,
                    scale: 1.6,
                    ease: "Power2.easeInOut",
                  });
                },
              });
          }
        }}
        onTouchEnd={() => {
          const windowWidth = window.innerWidth;
          if (windowWidth >= 1200) {
            document.querySelector("body")?.classList.remove("is-draggy");
            const item = document.querySelectorAll(".swiper-slide .inner-img");
            const itemImg = document.querySelectorAll(
              ".swiper-slide .inner-img img"
            );
            const tl = gsap.timeline();
            tl.set(item, {
              duration: 0.3,
              scale: 0.8,
              ease: "Power2.easeInOut",
            })
              .set(itemImg, {
                duration: 0.3,
                scale: 1.6,
                ease: "Power2.easeInOut",
              })
              .to(item, {
                duration: 0.3,
                scale: 1,
                ease: "Power2.easeInOut",
                onStart: () => {
                  gsap.to(itemImg, {
                    duration: 0.3,
                    scale: 1,
                    ease: "Power2.easeInOut",
                  });
                },
              });
          }
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SectionSlider;
