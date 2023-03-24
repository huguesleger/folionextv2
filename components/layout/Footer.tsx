import Link from "next/link";
import React from "react";

type FooterType = {
  type?: string;
};

const Footer = ({ type }: FooterType): JSX.Element => {
  return (
    <div className={type != null ? `footer ${type}` : "footer"}>
      <div className="copyright">
        <i className="far fa-copyright" aria-hidden></i> HL 2023. Tous droit
        réservés
      </div>
      <ul className="inner-social">
        <li className="social-icon">
          <Link className="btn-progress btn-social" href="#">
            <svg
              aria-hidden="true"
              className="progress"
              width="70"
              height="70"
              viewBox="0 0 70 70"
            >
              <path
                className="progress-path"
                d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                pathLength="1"
              />
            </svg>
            <i className="fab fa-facebook-f" aria-hidden></i>
          </Link>
        </li>
        <li className="social-icon">
          <Link className="btn-progress btn-social" href="#">
            <svg
              aria-hidden="true"
              className="progress"
              width="70"
              height="70"
              viewBox="0 0 70 70"
            >
              <path
                className="progress-path"
                d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                pathLength="1"
              />
            </svg>
            <i className="fab fa-linkedin-in" aria-hidden></i>
          </Link>
        </li>
        <li className="social-icon">
          <Link className="btn-progress btn-social" href="#">
            <svg
              aria-hidden="true"
              className="progress"
              width="70"
              height="70"
              viewBox="0 0 70 70"
            >
              <path
                className="progress-path"
                d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                pathLength="1"
              />
            </svg>
            <i className="fab fa-instagram" aria-hidden></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
