import React from "react";
import SplittingText from "./SplittingText";

const SplittingWrapperWord = ({ children }: any): JSX.Element => {
  const wrapWord = children.split(/(\s+)/);
  return (
    <>
      {wrapWord.map((children: string, index: number) => {
        return (
          <span className="wrapper-word" key={index}>
            <SplittingText>{children}</SplittingText>
          </span>
        );
      })}
    </>
  );
};

export default SplittingWrapperWord;
