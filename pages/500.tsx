import Link from "next/link";
import React from "react";
import ChangeWord from "../components/ChangeWord";
import Footer from "../components/layout/Footer";

export default function Custom500() {
  return (
    <div className="page-error">
      <div className="wrapper">
        <div className="container">
          <div className="wrap-content">
            <div className="error-infos">
              <ChangeWord
                word1={"Oups !"}
                word2={"C'est la mouise !"}
                word3={"Mince !"}
                word4={"F*** !"}
              />
              <p>une erreur est survenue</p>
            </div>

            <div className="infinite-keywords">
              <p className="keywords">
                <span className="wrap-keyword keyword-bold">
                  500
                  <span className="separate-keyword">
                    <i className="fas fa-circle" aria-hidden></i>
                  </span>
                </span>
                <span className="wrap-keyword">
                  Le serveur ne répond pas
                  <span className="separate-keyword">
                    <i className="fas fa-circle" aria-hidden></i>
                  </span>
                </span>
              </p>
              <p className="keywords">
                <span className="wrap-keyword keyword-bold">
                  500
                  <span className="separate-keyword">
                    <i className="fas fa-circle" aria-hidden></i>
                  </span>
                </span>
                <span className="wrap-keyword">
                  Le serveur ne répond pas
                  <span className="separate-keyword">
                    <i className="fas fa-circle" aria-hidden></i>
                  </span>
                </span>
              </p>
            </div>
            <div className="wrap-btn">
              <Link href="/" className="btn btn-xl btn-dark btn-effect">
                <span>
                  <span>
                    <i className="fas fa-home" aria-hidden></i>
                    Retour à l&apos;accueil
                  </span>
                </span>
              </Link>
            </div>
            <Footer type={"footer-dark"} />
          </div>
        </div>
      </div>
    </div>
  );
}
