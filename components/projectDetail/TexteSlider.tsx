import React from "react";
import { StructuredText } from "react-datocms";
import { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

type TxtType = {
  txt: any;
};

const TexteSlider = ({ txt }: TxtType): JSX.Element => {
  // console.log(structuredText.value.document.children[0].children.value === "", "log");
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="wrap-desc">
            <div className="inner-desc">
              <StructuredText data={txt} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TexteSlider;
