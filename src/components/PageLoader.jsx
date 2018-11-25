import React from "react";
import Navigation from "./Navigation";

const PageLoader = ({ Component }) => (
  <div className={`pageLoader`}>
    <Navigation />
    <div id={`content`}>
      <Component />
    </div>
  </div>
);


export default PageLoader;
