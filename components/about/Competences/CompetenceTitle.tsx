import React from "react";

type CompetenceTitleType = {
  title: string;
  icon: string;
};

const CompetenceTitle = ({ title, icon }: CompetenceTitleType): JSX.Element => {
  return (
    <span className="wrap-keyword">
      {title}
      <span className="separate-keyword">
        <i className={icon} aria-hidden></i>
      </span>
    </span>
  );
};

export default CompetenceTitle;
