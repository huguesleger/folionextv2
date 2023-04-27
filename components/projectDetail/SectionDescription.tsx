import React from "react";
import { StructuredText } from "react-datocms";
import { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

type DescType = {
  desc: StructuredTextType;
};

const SectionDescription = ({ desc }: DescType): JSX.Element => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="wrap-desc">
          <div className="inner-desc">
            <StructuredText data={desc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDescription;
