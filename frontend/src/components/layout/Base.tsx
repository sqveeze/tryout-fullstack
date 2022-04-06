import React from "react";

export const BaseLayout: React.FC = ({ children }): JSX.Element => {
  return (
    <>
      {/*<header>*/}
      {/*  header is no needed for now*/}
      {/*</header>*/}
      <main>{children}</main>
      {/*<footer>*/}
      {/*  footer is no needed for now*/}
      {/*</footer>*/}
    </>
  );
};
