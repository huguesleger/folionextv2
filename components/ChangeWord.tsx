import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type ChangeWordType = {
  word1: string;
  word2: string;
  word3: string;
  word4: string;
};

const ChangeWord = ({
  word1,
  word2,
  word3,
  word4,
}: ChangeWordType): JSX.Element => {
  const changeWord = useRef(null);
  const refWord1 = useRef(null);
  const refWord2 = useRef(null);
  const refWord3 = useRef(null);
  const refWord4 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
    });
    tl.to(refWord1.current, {
      delay: 0.5,
      duration: 0.5,
      opacity: 0,
      y: "-10px",
    })
      .set(refWord2.current, {
        display: "block",
        opacity: 0,
        y: "10px",
      })
      .to(refWord2.current, {
        duration: 1,
        ease: "Power3.easeOut",
        y: "0",
        opacity: 1,
      })
      .to(refWord2.current, {
        delay: 0.5,
        duration: 0.5,
        opacity: 0,
        y: "-10px",
        ease: "Power1.easeInOut",
      })
      .set(refWord3.current, {
        display: "block",
        opacity: 0,
        y: "10px",
      })
      .to(refWord3.current, {
        duration: 1,
        ease: "Power3.easeOut",
        y: "0",
        opacity: 1,
      })
      .to(refWord3.current, {
        delay: 0.5,
        duration: 0.5,
        opacity: 0,
        y: "-10px",
        ease: "Power1.easeInOut",
      })
      .set(refWord4.current, {
        display: "block",
        opacity: 0,
        y: "10px",
      })
      .to(refWord4.current, {
        duration: 1,
        ease: "Power3.easeOut",
        y: "0",
        opacity: 1,
      })
      .to(refWord4.current, {
        delay: 0.5,
        duration: 0.5,
        opacity: 0,
        y: "-10px",
        ease: "Power1.easeInOut",
      })
      .set(refWord1.current, {
        display: "block",
        opacity: 0,
        y: "10px",
      })
      .to(refWord1.current, {
        duration: 1,
        ease: "Power3.easeOut",
        y: "0",
        opacity: 1,
      });
  }, []);

  return (
    <div className="change-word" ref={changeWord}>
      <div className="word word-1" ref={refWord1}>
        {word1}
      </div>
      <div className="word word-2" ref={refWord2}>
        {word2}
      </div>
      <div className="word word-3" ref={refWord3}>
        {word3}
      </div>
      <div className="word word-4" ref={refWord4}>
        {word4}
      </div>
    </div>
  );
};

export default ChangeWord;
