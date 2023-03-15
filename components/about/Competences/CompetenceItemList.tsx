import React from "react";

type CompetenceItemListType = {
  id: string;
  texte: string;
};

const CompetenceItemList = ({
  id,
  texte,
}: CompetenceItemListType): JSX.Element => {
  return <li key={id}>{texte}</li>;
};

export default CompetenceItemList;
