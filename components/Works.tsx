import React, { useContext, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import fit from "math-fit";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { useRouter } from "next/router";
import { Context } from "../context/AppContext";
import { SharedLayoutDataContext } from "../context/MotionContext";

gsap.registerPlugin(CustomEase);

const Work = ({ props }: any): JSX.Element => {
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props && props.projets;
  const refCanvas = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setPreviousPage, previousPage } = useContext(Context);
  const { setCurrent, setValue } = useContext(SharedLayoutDataContext);

  let app: any;
  let canvas: any;
  let container: any;
  let thumbs: any[];
  let displacementFilter2: any;
  let visibleImageIndex: any;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let scrollTarget = 0;
  let scroll = 0;
  let currentScroll = 0;
  let margin = 300;
  let aspect = 0.66;
  let imageWidth = 500;
  let imageHeight = imageWidth / aspect;
  let wholeHeight = projets.length * (imageHeight + margin);
  let currentProgress = 189;
  let progress = 189 / projets.length - 1;

  const initPixi = () => {
    canvas = refCanvas.current;
    app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0x171717,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
      clearBeforeRender: true,
    });

    canvas?.appendChild(app.view);

    container = new PIXI.Container();
    app.stage.addChild(container);
  };

  const add = () => {
    thumbs = [];

    const parent = {
      w: imageWidth,
      h: imageHeight,
    };

    projets.forEach((img, i) => {
      let c = new PIXI.Container();
      let containerImage = new PIXI.Container();
      c.pivot.x = -width / 2;
      c.pivot.y = -height / 2 - 16;

      containerImage.y = (margin + imageHeight) * i - imageHeight / margin;

      let image = PIXI.Sprite.from(img.imageSlider.url);
      image.anchor.set(0.5);
      c.addChild(image);
      containerImage.addChild(c);

      image.texture.orig.width = img.imageSlider.width;
      image.texture.orig.height = img.imageSlider.height;

      const target = {
        w: image.texture.orig.width,
        h: image.texture.orig.height,
      };

      image.position.set(
        image.texture.orig.width / 4,
        image.texture.orig.height / 4
      );

      const cover = fit(target, parent);

      image.position.set(cover.left, cover.top);
      image.scale.set(cover.scale, cover.scale);

      let uniforms = {
        uPower: 0,
        uDir: 1,
        uDisp: PIXI.Sprite.from("../images/round-disp.jpg").texture,
        uText: image.texture,
        filterMatrix: new PIXI.Matrix(),
      };

      const vertex = `
      attribute vec2 aVertexPosition;

      uniform mat3 projectionMatrix;
      uniform mat3 filterMatrix;

      varying vec2 vTextureCoord;
      varying vec2 vFilterCoord;

      uniform vec4 inputSize;
      uniform vec4 outputFrame;

      vec4 filterVertexPosition( void )
      {
          vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

          return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
      }

      vec2 filterTextureCoord( void )
      {
          return aVertexPosition * (outputFrame.zw * inputSize.zw);
      }

      void main(void)
      {
          gl_Position = filterVertexPosition();
          vTextureCoord = filterTextureCoord();
          vFilterCoord = (filterMatrix * vec3(vTextureCoord, 1.0)).xy;
      }
      `;

      const fragment = `

        varying vec2 vTextureCoord;
        varying vec2 vFilterCoord;

        uniform float uPower;
        uniform float uDir;

        uniform sampler2D uSampler;
        uniform sampler2D uDisp;
        uniform sampler2D uText;

        void main(void)
        {
        vec2 uv = vFilterCoord;
        vec4 disp = texture2D(uDisp, uv);
        vec4 color = texture2D(uText, vec2(uv.x, uv.y - 0.2*disp.r * uDir * uPower));
        gl_FragColor = vec4(uv,0.,1.);
        gl_FragColor = color;
        }`;

      let displacementFilter = new PIXI.Filter(vertex, fragment, uniforms);

      displacementFilter.apply = function (filtermanager, input, output, e) {
        this.uniforms.filterMatrix = filtermanager.calculateSpriteMatrix(
          uniforms.filterMatrix,
          image
        );
        filtermanager.applyFilter(this, input, output, e);
      };

      image.filters = [displacementFilter];

      // filter on enter slider
      const displacementSprite = PIXI.Sprite.from(
        "../images/displacement-filter.jpg"
      );

      displacementSprite.position.set(cover.left, cover.top);
      displacementSprite.scale.set(cover.scale, cover.scale);

      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter2 = new PIXI.DisplacementFilter(displacementSprite);

      displacementFilter2.scale.x = 60;
      displacementFilter2.scale.y = 40;

      if (i === 0 && previousPage != "page-home") {
        containerImage.filters = [displacementFilter2];
      }

      let mask = new PIXI.Graphics();

      c.addChild(mask);
      c.mask = mask;

      containerImage.name = "/projets/" + img.slug;

      containerImage.on("mouseover", mouseHover);
      containerImage.on("mouseout", mouseOut);
      containerImage.on("click", onClick);

      container.addChild(containerImage);

      thumbs.push({
        mask: mask,
        container: containerImage,
        image: image,
        uniforms: uniforms,
        position: i,
        isVisible: false,
        dataAttribute: i + 1,
      });

      const tl = gsap.timeline();
      const btnStartAnim = document.querySelector(".inner-enter");
      const title = document.querySelector(".title-item.active .item-link");
      const titleHover = document.querySelectorAll(
        ".title-item .item-hover .wrapper-word .char"
      );
      const titleWorks = document.querySelector(".title-works");
      const innerItems = document.querySelector(".inner-items");
      const progressWork = document.querySelector(".progress-work");

      tl.set(image.transform.pivot, {
        y: -1800,
      })
        .set(title, {
          yPercent: 115,
          rotate: 6,
        })
        .set(titleWorks, {
          xPercent: -100,
        })
        .set(innerItems, {
          xPercent: 100,
        })
        .set(progressWork, {
          opacity: 0,
        })
        .set(titleHover, {
          yPercent: 100,
        });

      btnStartAnim?.addEventListener("click", function () {
        containerImage.interactive = true;
        tl.to(image.transform.pivot, {
          y: 0,
          duration: 0.8,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.126,0.382 0.112,0.752 0.392,0.892 0.466,0.929 0.818,1.001 1,1 "
          ),
          delay: 3,
          onStart: () => {
            gsap.to(titleWorks, {
              xPercent: 0,
              duration: 0.5,
              ease: "Power2.ease",
              delay: 0.5,
            });
          },
          onComplete: () => {
            gsap.to(title, {
              yPercent: 0,
              rotate: 0,
              duration: 0.5,
              ease: "Power2.ease",
            });
            gsap.to(innerItems, {
              xPercent: 0,
              duration: 0.5,
              ease: "Power2.easeInOut",
              delay: 0.5,
            });
            gsap.to(progressWork, {
              opacity: 1,
              duration: 0.5,
              ease: "Power2.easeInOut",
              delay: -0.5,
            });
          },
        });
      });

      if (previousPage === "page-home") {
        containerImage.interactive = true;
        tl.set(image.transform.pivot, {
          y: 0,
        })
          .set(title, {
            yPercent: 0,
            rotate: 0,
          })
          .set(titleWorks, {
            xPercent: 0,
          })
          .set(innerItems, {
            xPercent: 0,
          })
          .set(progressWork, {
            opacity: 1,
          });
      }
    });
  };

  const updateAllTheThings = () => {
    thumbs.forEach((slide) => {
      slide.mask.clear();
      slide.mask.beginFill(0xff0000);
      let mx = imageWidth - 260;
      let my = imageHeight - 450;
      let distortion = scroll * 2;
      let coef = 0.2;

      slide.uniforms.uDir = Math.sign(distortion);
      slide.uniforms.uPower = Math.abs(distortion * 0.01);

      let p = [
        {
          x: mx,
          y: -my,
        },
        {
          x: -mx,
          y: -my,
        },
        {
          x: -mx,
          y: my,
        },
        {
          x: mx,
          y: my,
        },
      ];

      if (distortion < 0) {
        p[2].x += Math.abs(distortion) * 0.4;
        p[2].y -= Math.abs(distortion) * 0.4;
        p[3].x -= Math.abs(distortion) * 0.4;
        p[3].y -= Math.abs(distortion) * 0.4;
      } else {
        p[0].x -= Math.abs(distortion) * 0.2;
        p[0].y += Math.abs(distortion) * 0.2;
        p[1].x += Math.abs(distortion) * 0.2;
        p[1].y += Math.abs(distortion) * 0.2;
      }

      let control = [
        {
          x: 0.5 * p[0].x + 0.5 * p[1].x,
          y: 0.5 * p[0].y + 0.5 * p[1].y + distortion,
        },
        {
          x: 0.5 * p[1].x + 0.5 * p[2].x + Math.abs(distortion * coef),
          y: 0.5 * p[1].y + 0.5 * p[2].y,
        },
        {
          x: 0.5 * p[2].x + 0.5 * p[3].x,
          y: 0.5 * p[2].y + 0.5 * p[3].y + distortion,
        },
        {
          x: 0.5 * p[3].x + 0.5 * p[0].x - Math.abs(distortion * coef),
          y: 0.5 * p[3].y + 0.5 * p[0].y,
        },
      ];

      slide.mask.moveTo(p[0].x, p[0].y);
      slide.mask.quadraticCurveTo(control[0].x, control[0].y, p[1].x, p[1].y);
      slide.mask.quadraticCurveTo(control[1].x, control[1].y, p[2].x, p[2].y);
      slide.mask.quadraticCurveTo(control[2].x, control[2].y, p[3].x, p[3].y);
      slide.mask.quadraticCurveTo(control[3].x, control[3].y, p[0].x, p[0].y);

      slide.container.position.y = calcPos(scroll, slide.container.position.y);
    });
  };

  const filterAnim = () => {
    const tl = gsap.timeline();
    const btnStartAnim = document.querySelector(".inner-enter");

    btnStartAnim?.addEventListener("click", function () {
      thumbs.forEach((slide, i) => {
        if (i === 0) {
          tl.to(slide.image.parent.parent.filters[0].scale, {
            x: 0,
            y: 0,
            duration: 0.6,
            delay: 3.5,
            onComplete: () => {
              slide.image.parent.parent.filters = null;
            },
          });
        }
      });
    });
  };

  let calcPos = (src: any, pos: any) => {
    let temp =
      ((src + pos + wholeHeight + imageHeight + margin) % wholeHeight) -
      imageHeight -
      margin;

    return temp;
  };

  const mouseHover = (e: any) => {
    const nav = document.querySelector(".nav.is-open");
    const titleActive = document.querySelector(".title-item.active .item-link");
    const char = titleActive?.querySelectorAll(".wrapper-word .char");
    const titleHoverActive = document.querySelector(
      ".title-item.active .item-hover"
    );
    const charHover = titleHoverActive?.querySelectorAll(".wrapper-word .char");
    const el = e.target.children[0].children[0];
    const tl = gsap.timeline();

    setValue({
      x: e.target.x,
      y: e.target.y,
      width: e.target.width,
      height: e.target.height,
    });

    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };
    tl.to(el.transform.scale, {
      x: 0.454570707070707,
      y: 0.454570707070707,
      duration: 0.5,
      ease: "Power2.easeInOut",
      onStart: () => {
        if (char) {
          gsap.to(char, {
            yPercent: -100,
            ease: "Power2.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal,
          });
          if (charHover) {
            gsap.to(charHover, {
              yPercent: 0,
              ease: "Power2.easeInOut",
              duration: tlSettings.charsDuration,
              stagger: tlSettings.staggerVal,
            });
          }
        }
      },
    });
    if (!nav) {
      const cursor = document.querySelector(".cursor");
      cursor?.classList.add("has-canvas");
      const label = document.querySelector(".cursor-label-canvas");
      label?.classList.remove("label-hidden");
    }
  };

  const mouseOut = (e: any) => {
    const titleActive = document.querySelector(".title-item.active .item-link");
    const char = titleActive?.querySelectorAll(".wrapper-word .char");
    const titleHoverActive = document.querySelector(
      ".title-item.active .item-hover"
    );
    const charHover = titleHoverActive?.querySelectorAll(".wrapper-word .char");
    const el = e.currentTarget.children[0].children[0];
    const tl = gsap.timeline();
    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };
    tl.to(el.transform.scale, {
      x: 0.394570707070707,
      y: 0.394570707070707,
      duration: 0.5,
      ease: "Power2.easeInOut",
      onStart: () => {
        if (charHover) {
          gsap.to(charHover, {
            yPercent: 100,
            ease: "Power2.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal,
          });
          if (char) {
            gsap.to(char, {
              yPercent: 0,
              ease: "Power2.easeInOut",
              duration: tlSettings.charsDuration,
              stagger: tlSettings.staggerVal,
            });
          }
        }
      },
    });
    const cursor = document.querySelector(".cursor");
    cursor?.classList.remove("has-canvas");
    const label = document.querySelector(".cursor-label-canvas");
    label?.classList.add("label-hidden");
  };

  const onClick = (e: any) => {
    const el = e.target;
    const path = el.name;
    const canvasRec = e.target._localBoundsRect;

    setValue({
      x: canvasRec.x,
      y: el.y + el._localBoundsRect.y,
      width: canvasRec.width,
      height: canvasRec.height,
    });

    setCurrent("canvasHome");
    setPreviousPage("page-home");
    router.push(path);
  };

  const scrollEvent = () => {
    refCanvas.current?.addEventListener("wheel", (e) => {
      scrollTarget = e.deltaY / 3;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      visibleImageIndex = -1;

      const progressCircleLine: any = document.querySelector(
        ".circle-line-progress"
      );

      thumbs?.forEach((th, i) => {
        const containerTop = th.container.position.y - scrollY;
        const containerBottom =
          containerTop + th.image.height - margin - scroll;

        if (containerTop < windowHeight && containerBottom > 0) {
          visibleImageIndex = i;
        }
        if (
          i === projets.length &&
          th.container.y < 0 &&
          th.container.y < -margin
        ) {
          visibleImageIndex = 0;
        }
      });
      const titles = document.querySelectorAll(".title-item");
      const numberItem: any = document.querySelector(".number-item span");

      titles.forEach((title: any, i: any) => {
        if (i === visibleImageIndex) {
          title.classList.add("active");
          if (numberItem != null) {
            numberItem.innerHTML = visibleImageIndex + 1;
          }
        } else {
          title.classList.remove("active");
        }
      });

      if (progressCircleLine) {
        progressCircleLine.style.strokeDashoffset =
          currentProgress + currentScroll / progress + "px";
      }
    });
  };

  const resize = () => {
    app.view.style.width = window?.innerWidth + "px";
    app.view.style.height = window?.innerHeight + "px";

    thumbs.forEach((th) => {
      th.container.children[0].pivot.x = -window.innerWidth / 2;
      th.container.children[0].pivot.y = -window.innerHeight / 2;
    });
  };

  const render = () => {
    app.ticker.add(() => {
      app.renderer.render(container);
      updateAllTheThings();
      scroll -= (scroll - scrollTarget) * 0.1;
      scrollTarget *= 0.9;
      currentScroll += scroll;
      window.addEventListener("resize", resize);
    });
  };

  useEffect(() => {
    initPixi();
    add();
    scrollEvent();
    filterAnim();
    render();
    // app.start();
    thumbs.forEach((el) => {
      router.prefetch(el.container.name);
    });

    return () => {
      previousPage;
      app.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, [router]);

  return <div ref={refCanvas} className="canvas-works"></div>;
};

export default Work;
