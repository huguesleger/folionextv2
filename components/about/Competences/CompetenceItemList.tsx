import React from "react";

type CompetenceItemListType = {
  texte: string;
};

const CompetenceItemList = ({ texte }: CompetenceItemListType): JSX.Element => {
  return <li>{texte}</li>;
};

export default CompetenceItemList;
