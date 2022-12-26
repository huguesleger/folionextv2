import React, { ReactNode } from "react";
import Loader from "../Loader";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div id="app" className="app">
        <Loader />
        {children}
      </div>
    </>
  );
}
