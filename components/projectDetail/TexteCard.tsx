import React from "react";
import { StructuredText } from "react-datocms";
import { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

type TxtType = {
  txt: StructuredTextType;
};

const TexteCard = ({ txt }: TxtType): JSX.Element => {
  return (
    <div className="wrap-desc">
      <div className="inner-desc">
        <StructuredText data={txt} />
      </div>
    </div>
  );
};

export default TexteCard;
