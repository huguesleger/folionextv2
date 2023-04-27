import React from "react";
import { StructuredText } from "react-datocms";
import { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

type TxtType = {
  txt: StructuredTextType;
};

const SectionTxt = ({ txt }: TxtType): JSX.Element => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="wrap-desc">
          <div className="inner-desc">
            <StructuredText data={txt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTxt;
