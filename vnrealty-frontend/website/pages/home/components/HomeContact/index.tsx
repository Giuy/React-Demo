import React from "react";
import QuickQuote from "./QuickQuote";

const HomeContact = () => {
  return (
    <div className="row">
      <div className="col-lg-5 bg-primary">Map</div>
      <div className="col-lg-3 bg-green">Headquarters</div>
      <div className="col-lg-4">
        <QuickQuote />
      </div>
    </div>
  );
};

export default HomeContact;
