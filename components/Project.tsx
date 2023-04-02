import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import fit from "math-fit";
import gsap from "gsap";

const CanvasWork = ({ props }: any): JSX.Element => {
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props && props.projets;
  const refCanvas = useRef<HTMLDivElement>(null);

  let app: any;
  let canvas: any;
  let container: any;
  let containerAllSprite: any;
  let spriteContainer: any;
  let thumbs: any[];
  let displacementSprite: any;
  let displacementFilter: any;
  let titles: NodeListOf<Element>;
  let barLine: HTMLElement | null;
  let width = window.innerWidth;
  let height = window.innerHeight / 2;
  let widthImage = width;
  let heightImage = height;
  let currentIndex = 0;
  let isAnimating = false;

  const initPixi = () => {
    canvas = refCanvas.current;
    app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0x171717,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      // resizeTo: window,
      clearBeforeRender: true,
    });

    canvas.appendChild(app.view);

    container = new PIXI.Container();
    app.stage.addChild(container);
  };

  const add = () => {
    const parent = {
      w: widthImage,
      h: heightImage,
    };

    thumbs = [];
    projets.forEach((img, i) => {
      const texture = PIXI.Texture.from(img.imageSlider.url);
      const sprite = new PIXI.Sprite(texture);

      containerAllSprite = new PIXI.Container();
      spriteContainer = new PIXI.Container();
      let mask = new PIXI.Sprite(PIXI.Texture.WHITE);

      mask.width = widthImage;
      mask.height = heightImage;

      sprite.mask = mask;

      sprite.texture.orig.width = img.imageSlider.width;
      sprite.texture.orig.height = img.imageSlider.height;

      const target = {
        w: sprite.texture.orig.width,
        h: sprite.texture.orig.height,
      };

      sprite.anchor.set(0.5);
      sprite.position.set(
        sprite.texture.orig.width / 2,
        sprite.texture.orig.height / 2
      );

      const cover = fit(target, parent);

      spriteContainer.position.set(cover.left, cover.top);
      spriteContainer.scale.set(cover.scale, cover.scale);

      containerAllSprite.x = 0;
      containerAllSprite.y = 0;

      if (i !== 0) {
        gsap.set(spriteContainer, { alpha: 0 });
      }

      displacementSprite = PIXI.Sprite.from("../images/clouds.jpg");

      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter = new PIXI.DisplacementFilter(displacementSprite);

      displacementFilter.scale.x = 0;
      displacementFilter.scale.y = 0;

      containerAllSprite.filters = [displacementFilter];

      spriteContainer.addChild(sprite);

      containerAllSprite.addChild(spriteContainer);
      containerAllSprite.addChild(mask);
      container.addChild(containerAllSprite);
      thumbs.push(containerAllSprite);
    });
  };

  const initElDom = () => {
    titles = document.querySelectorAll(".title-project");
    barLine = document.querySelector(".inner-pagination .bar-line");
    titles.forEach((el, i) => {
      if (i !== 0) {
        gsap.set(el, {
          opacity: 0,
          height: 0,
        });
      }
      gsap.set(barLine, {
        scaleY: currentIndex + 1 / projets.length,
      });
    });
  };

  const moveSlideUp = (newIndex: any) => {
    titles = document.querySelectorAll(".title-project");
    const currentTitle = titles[currentIndex];
    const nextTitle = titles[newIndex];
    const currentTitleChars = currentTitle.querySelectorAll(
      ".wrapper-word .char"
    );
    const nextTitleChars = nextTitle.querySelectorAll(".wrapper-word .char");
    const barLine = document.querySelector(".inner-pagination .bar-line");
    const numberItem: any = document.querySelector(
      ".pagination-number.number-first span"
    );

    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };

    const tl = gsap.timeline({
      onStart: () => {
        isAnimating = true;
      },
      onComplete: () => {
        isAnimating = false;
        currentIndex = newIndex;
      },
    });

    tl.clear();

    if (tl.isActive()) {
      return;
    }
    tl.to(
      thumbs[currentIndex].children[0],
      {
        alpha: 0,
        ease: "Power2.easeOut",
        duration: 1.5,
      },
      0
    )
      .to(
        thumbs[newIndex].children[0],
        {
          alpha: 1,
          ease: "Power2.easeOut",
          duration: 1,
        },
        1
      )
      .to(
        thumbs[currentIndex].filters[0].scale,
        {
          x: 800,
          y: 500,
          ease: "Power2.easeOut",
          duration: 1.5,
        },
        0
      )
      .fromTo(
        thumbs[newIndex].filters[0].scale,
        {
          x: 800,
          y: 500,
        },
        {
          x: 0,
          y: 0,
          ease: "Expo.easeOut",
          duration: 1.5,
        },
        0.8
      )
      .to(
        currentTitle,
        {
          opacity: 0,
          height: 0,
          ease: "Power2.easeOut",
          duration: 0.5,
        },
        0
      )
      .to(
        nextTitle,
        {
          opacity: 1,
          height: "auto",
          ease: "Expo.easeOut",
          duration: 0.5,
        },
        1
      )
      .to(
        currentTitleChars,
        {
          yPercent: -100,
          ease: "Power2.easeOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        },
        0
      )
      .fromTo(
        nextTitleChars,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "Expo.easeOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        },
        1
      )
      .to(
        barLine,
        {
          scaleY: (currentIndex + 2) / projets.length,
          duration: 0.5,
          ease: "Expo.easeInOut",
        },
        0
      );
    if (currentIndex === projets.length - 1) {
      currentIndex = 0;
      tl.to(
        barLine,
        {
          scaleY: (currentIndex + 1) / projets.length,
          duration: 0.5,
          ease: "Expo.easeInOut",
        },
        0
      );
    }
    if (numberItem != null) {
      numberItem.innerHTML = newIndex + 1;
    }
  };

  const moveSlideDown = (newIndex: any) => {
    titles = document.querySelectorAll(".title-project");
    const currentTitle = titles[currentIndex];
    const nextTitle = titles[newIndex];
    const currentTitleChars = currentTitle.querySelectorAll(
      ".wrapper-word .char"
    );
    const nextTitleChars = nextTitle.querySelectorAll(".wrapper-word .char");
    const barLine = document.querySelector(".inner-pagination .bar-line");
    const numberItem: any = document.querySelector(
      ".pagination-number.number-first span"
    );

    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };

    const tl = gsap.timeline({
      onStart: () => {
        isAnimating = true;
      },
      onComplete: () => {
        isAnimating = false;
        currentIndex = newIndex;
      },
    });

    tl.clear();

    if (tl.isActive()) {
      return;
    }
    tl.to(
      thumbs[currentIndex].children[0],
      {
        alpha: 0,
        ease: "Power2.easeOut",
        duration: 1.5,
      },
      0
    )
      .to(
        thumbs[newIndex].children[0],
        {
          alpha: 1,
          ease: "Power2.easeOut",
          duration: 1,
        },
        1
      )
      .to(
        thumbs[currentIndex].filters[0].scale,
        {
          x: 800,
          y: 500,
          ease: "Power2.easeOut",
          duration: 1.5,
        },
        0
      )
      .fromTo(
        thumbs[newIndex].filters[0].scale,
        {
          x: 800,
          y: 500,
        },
        {
          x: 0,
          y: 0,
          ease: "Expo.easeOut",
          duration: 1.5,
        },
        0.8
      )
      .to(
        currentTitle,
        {
          opacity: 0,
          height: 0,
          ease: "Power2.easeOut",
          duration: 0.5,
        },
        0
      )
      .to(
        nextTitle,
        {
          opacity: 1,
          height: "auto",
          ease: "Expo.easeOut",
          duration: 0.5,
        },
        1
      )
      .to(
        currentTitleChars,
        {
          yPercent: -100,
          ease: "Power2.easeOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        },
        0
      )
      .fromTo(
        nextTitleChars,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "Expo.easeOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        },
        1
      )
      .to(
        barLine,
        {
          scaleY: currentIndex / projets.length,
          duration: 0.5,
          ease: "Expo.easeInOut",
        },
        0
      );
    if (currentIndex === 0) {
      currentIndex = projets.length;
      tl.to(
        barLine,
        {
          scaleY: currentIndex / projets.length,
          duration: 0.5,
          ease: "Expo.easeInOut",
        },
        0
      );
    }
    if (numberItem != null) {
      numberItem.innerHTML = currentIndex;
    }
  };

  const scrollEvent = () => {
    document.addEventListener("wheel", (e) => {
      if (isAnimating) {
        return false;
      }

      if (e.deltaY > 0) {
        if (currentIndex >= 0 && currentIndex < projets.length - 1) {
          moveSlideUp(currentIndex + 1);
        } else {
          moveSlideUp(0);
        }
      } else {
        if (currentIndex > 0 && currentIndex < projets.length) {
          moveSlideDown(currentIndex - 1);
        } else {
          moveSlideDown(projets.length - 1);
        }
      }
    });
  };

  const resize = () => {
    window.addEventListener("resize", function () {
      app.view.style.width = window.innerWidth + "px";
      app.view.style.height = window.innerHeight / 2 + "px";
    });
  };

  const render = () => {
    app.ticker.add((delta: any) => {
      app.renderer.render(container);
      displacementSprite.x += 2 * delta;
      displacementSprite.y += 5;
    });
  };

  useEffect(() => {
    initPixi();
    add();
    initElDom();
    scrollEvent();
    resize();
    render();
  }, []);

  return (
    <>
      <div ref={refCanvas} className="canvas-projects"></div>
    </>
  );
};

export default CanvasWork;
