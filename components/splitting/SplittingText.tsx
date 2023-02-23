import React from "react";

const SplittingText = ({ children }: any): JSX.Element => {
  const word = children.split("");

  return (
    <>
      {word.map((children: string, index: number) => {
        return (
          <span className="char" key={index}>
            {children}
          </span>
        );
      })}
    </>
  );
};

export default SplittingText;
