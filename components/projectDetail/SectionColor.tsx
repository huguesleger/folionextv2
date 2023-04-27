import React from "react";

type ColorType = {
  color: string;
  titre: string;
  colorTxt: string;
};

const SectionColor = ({ color, colorTxt, titre }: ColorType): JSX.Element => {
  return (
    <div className="block-color" style={{ backgroundColor: color }}>
      <div className="inner-text">
        <p className={colorTxt}>{titre}</p>
      </div>
    </div>
  );
};

export default SectionColor;
