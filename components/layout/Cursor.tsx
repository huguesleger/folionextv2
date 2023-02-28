import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { getMousePos } from "../utils";

const Cursor = () => {
  const cursorCircle = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorWraper = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const cursorHoverElems =
    "a, button, .btn-main, [data-cursor], [data-cursor-label], [data-cursor-big], [data-cursor-dark]";

  let mouseIsHover = false;
  let mousepos = { x: 0, y: 0 };

  const mouseMove = (ev: any) => {
    mousepos = getMousePos(ev);

    const tl = gsap.timeline();
    tl.set(cursor.current, {
      x: mousepos.x,
      y: mousepos.y,
      opacity: 1,
    }).to(cursor.current, {
      duration: 0.2,
      x: mousepos.x,
      y: mousepos.y,
      onComplete: () => {
        gsap.to(cursor.current, {
          duration: 0.2,
        });
        mouseIsHover
          ? cursorWraper.current?.classList.add("is-hover")
          : cursorWraper.current?.classList.remove("is-hover");
      },
    });
  };

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1100) {
      if (cursor.current == null || cursor == null) return;
      document.addEventListener("pointermove", (e) => {
        if (cursor.current == null) return;

        mouseMove(e);

        if ((e.target as HTMLElement).closest(cursorHoverElems)) {
          mouseIsHover = true;
          if ((e.target as HTMLElement).getAttribute("data-cursor-label")) {
            cursor.current.classList.add("has-label");
            if (label.current !== null) {
              (label.current.innerHTML as String | null) = (
                e.target as HTMLElement
              ).getAttribute("data-cursor-label");
            }
          }
          if ((e.target as HTMLElement).getAttribute("data-cursor-big")) {
            cursor.current.classList.add("has-big");
          }
          if ((e.target as HTMLElement).getAttribute("data-cursor-dark")) {
            cursor.current.classList.add("has-dark");
          }
        } else {
          mouseIsHover = false;
          cursor.current.classList.remove("has-label");
          cursor.current.classList.remove("has-big");
          cursor.current.classList.remove("has-dark");
          if (label.current !== null) {
            (label.current.innerHTML as String | null) = "";
          }
        }
      });
    }
  }, []);

  return (
    <div className="cursor" ref={cursor}>
      <div className="cursor-wrapper" ref={cursorWraper}>
        <div className="cursor-circle" id="cursor-circle" ref={cursorCircle}>
          <div className="cursor-label" ref={label}></div>
          <div className="cursor-label-canvas label-hidden">Voir le projet</div>
          <div className="cursor-drag">
            <div className="arrow-left"></div>
            <div className="arrow-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursor;
