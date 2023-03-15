import React, { ReactNode } from "react";

type CompetenceItemType = {
  title: string;
  id: string;
  number: string;
  icon: string;
  children: ReactNode;
};

const CompetenceItem = ({
  title,
  id,
  number,
  icon,
  children,
}: CompetenceItemType): JSX.Element => {
  return (
    <div className="inner-item" key={id}>
      <span className="number-item">{number}</span>
      <i className={icon} aria-hidden></i>
      <h3 className="title-item">{title}</h3>
      {children}
    </div>
  );
};

export default CompetenceItem;
