import Image from "next/image";
import Link from "next/link";
import React from "react";
import SplittingWrapperWord from "../splitting/SplittingWrapperWord";

type DescType = {
  titre: string;
  siteWeb: string;
  intervention: string;
  annee: string;
};

const SectionInfo = ({
  titre,
  siteWeb,
  intervention,
  annee,
}: DescType): JSX.Element => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="wrap-content">
          <div className="wrap-title">
            <div className="inner-title">
              <h1 className="title-project">
                <SplittingWrapperWord>{titre}</SplittingWrapperWord>
              </h1>
            </div>
          </div>
          <div className="wrap-infos">
            {siteWeb && (
              <div className="inner-info">
                <p className="name-info">Site web</p>
                <Link
                  href={`https://${siteWeb}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-website"
                >
                  <span className="link-text">Voir le site</span>
                  <span className="link-arrow">
                    <Image
                      src="/images/link-arrow-white.svg"
                      width={24}
                      height={24}
                      alt="Voir le site"
                    />
                  </span>
                </Link>
              </div>
            )}
            <div className="inner-info">
              <p className="name-info">Intervention</p>
              <p>{intervention}</p>
            </div>
            <div className="inner-info">
              <p className="name-info">Année</p>
              <p>{annee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInfo;
