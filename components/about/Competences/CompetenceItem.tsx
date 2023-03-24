import React, { ReactNode } from "react";

type CompetenceItemType = {
  title: string;
  number: string;
  icon: string;
  children: ReactNode;
};

const CompetenceItem = ({
  title,
  number,
  icon,
  children,
}: CompetenceItemType): JSX.Element => {
  return (
    <div className="inner-item" data-scroll data-scroll-speed="3">
      <span className="number-item">{number}</span>
      <i className={icon} aria-hidden></i>
      <h3 className="title-item">{title}</h3>
      {children}
    </div>
  );
};

export default CompetenceItem;
