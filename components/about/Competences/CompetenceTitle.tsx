import React from "react";

type CompetenceTitleType = {
  title: string;
  id: string;
  icon: string;
};

const CompetenceTitle = ({
  title,
  id,
  icon,
}: CompetenceTitleType): JSX.Element => {
  return (
    <span className="wrap-keyword" key={id}>
      {title}
      <span className="separate-keyword">
        <i className={icon} aria-hidden></i>
      </span>
    </span>
  );
};

export default CompetenceTitle;
