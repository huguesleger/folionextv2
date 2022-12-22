import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div id="app" className="app">
        {children}
      </div>
    </>
  );
}
