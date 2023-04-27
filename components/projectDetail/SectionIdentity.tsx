import Image from "next/image";
import React, { ReactNode } from "react";

type IdentityType = {
  titre: string;
  desc: string;
  children: ReactNode;
};

const SectionIdentity = ({
  titre,
  desc,
  children,
}: IdentityType): JSX.Element => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="wrap-content">
            <h2 className="title">{titre}</h2>
            <p className="desc">{desc}</p>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default SectionIdentity;
