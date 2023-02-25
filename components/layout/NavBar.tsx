import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header-content container">
        <Link className="logo" href="/">
          <Image
            src="/logo-hl.svg"
            layout="intrinsic"
            width={30}
            height={30}
            alt="Hugues Leger"
          />
        </Link>
        <div className="wrap-name">
          <div className="name">Hugues Leger</div>
          <div className="name-hover">Hugues Leger</div>
        </div>
        <div className="header-btn">
          <div className="btn-main">
            <span className="main-bar"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
