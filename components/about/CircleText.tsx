import React from "react";

type CircleTextType = {
  txt: string;
  txt2: string;
  txt3: string;
  txt4: string;
};

const CircleText = ({ txt, txt2, txt3, txt4 }: CircleTextType): JSX.Element => {
  return (
    <svg className="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
      <defs>
        <path
          id="circle-1"
          d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5"
        />
        <path
          id="circle-2"
          d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5"
        />
        <path
          id="circle-3"
          d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5"
        />
        <path
          id="circle-4"
          d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5"
        />
      </defs>
      <text className="circles-text circles-text-1">
        <textPath
          className="circles-text-path"
          xlinkHref="#circle-1"
          aria-label=""
          textLength="2820"
        >
          {txt}
        </textPath>
      </text>
      <text className="circles-text circles-text-2">
        <textPath
          className="circles-text-path"
          xlinkHref="#circle-2"
          aria-label=""
          textLength="1985"
        >
          {txt2}
        </textPath>
      </text>
      <text className="circles-text circles-text-3">
        <textPath
          className="circles-text-path"
          xlinkHref="#circle-3"
          aria-label=""
          textLength="1310"
        >
          {txt3}
        </textPath>
      </text>
      <text className="circles-text circles-text-4">
        <textPath
          className="circles-text-path"
          xlinkHref="#circle-4"
          aria-label=""
          textLength="810"
        >
          {txt4}
        </textPath>
      </text>
    </svg>
  );
};

export default CircleText;
