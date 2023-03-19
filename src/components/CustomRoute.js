import React from "react";
import Nav from "./Nav";

function CustomRoute({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default CustomRoute;
