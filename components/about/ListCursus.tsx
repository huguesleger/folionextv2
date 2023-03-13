import React, { useRef } from "react";
import gsap from "gsap";
import { clamp, getMousePos, lerp, map } from "../utils";
import dynamic from "next/dynamic";

const ImageCanvas = dynamic(() => import("./ListCanvas"), {
  ssr: false,
});

type ListCursusType = {
  titre: string;
  school: string;
  image: string;
  annee: string;
};

const ListCursus = ({
  titre,
  school,
  image,
  annee,
}: ListCursusType): JSX.Element => {
  const refHover = useRef<HTMLDivElement>(null);
  const refListItem = useRef<HTMLDivElement>(null);
  const refInner = useRef(null);

  let mousepos = { x: 0, y: 0 };

  let mousePosCache = mousepos;
  let direction = {
    x: mousePosCache.x - mousepos.x,
    y: mousePosCache.y - mousepos.y,
  };

  const mouseMove = (ev: any) => {
    let boundsReveal: any;
    let boundsItem: any;
    boundsItem = refListItem.current?.getBoundingClientRect();
    boundsReveal = refHover.current?.getBoundingClientRect();

    const mouseDistanceX = clamp(
      Math.abs(mousePosCache.x - mousepos.x),
      0,
      100
    );
    direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    };
    mousePosCache = { x: mousepos.x, y: mousepos.y };

    let animatableProperties = {
      tx: { previous: 0, current: 0, amt: 0.08 },
      ty: { previous: 0, current: 0, amt: 0.08 },
      rotation: { previous: 0, current: 0, amt: 0.04 },
    };

    const wW = window.innerWidth;

    if (wW >= 1100) {
      mousepos = getMousePos(ev);

      animatableProperties.rotation.current = map(
        mouseDistanceX,
        0,
        20,
        0,
        direction.x < 0 ? 60 : -60
      );

      animatableProperties.rotation.previous = lerp(
        animatableProperties.rotation.previous,
        animatableProperties.rotation.current,
        animatableProperties.rotation.amt
      );

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(refHover.current, {
            opacity: 1,
          });
        },
      });
      gsap.set(refHover.current, {
        x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
        y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
      });
      tl.to(refHover.current, {
        duration: 0.2,
        x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
        y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
        rotation: animatableProperties.rotation.previous,
      });
    }
  };

  const mouseEnter = () => {
    const wW = window.innerWidth;

    if (wW >= 1100) {
      gsap.set(refHover.current, {
        opacity: 0,
      });
      const tl = gsap.timeline();
      tl.fromTo(
        refInner.current,
        {
          scale: 0.3,
        },
        {
          duration: 1.2,
          ease: "Power2.easeOut",
          scale: 1,
        }
      );
    }
  };

  const mouseLeave = () => {
    const wW = window.innerWidth;

    if (wW >= 1100) {
      const tl = gsap.timeline();
      tl.to(refHover.current, {
        opacity: 0,
      });
    }
  };

  return (
    <div
      className="list-item"
      ref={refListItem}
      onMouseMove={mouseMove}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="title-list">
        <h3>{titre}</h3>
        <p className="school-list">{school}</p>
      </div>
      <div className="year-list">
        <p>{annee}</p>
      </div>
      <div className="list-reveal" ref={refHover}>
        <div className="list-reveal-inner" ref={refInner}>
          <ImageCanvas image={image} width={150} height={200} />
        </div>
      </div>
    </div>
  );
};

export default ListCursus;
