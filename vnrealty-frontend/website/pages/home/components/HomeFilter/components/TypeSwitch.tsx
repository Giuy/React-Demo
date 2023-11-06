import React, { useState } from "react";

type TypeSwitchProps = {
  type?: boolean;
  handleTypeChange?: (value: any) => void;
};

const TypeSwitch: React.FC<TypeSwitchProps> = ({ type, handleTypeChange }) => {
  console.log(type);
  return (
    <div className="type-switch col-lg-2 col-md-12 bottommargin-sm">
      TYPE
      <div className="toggle__container" onClick={handleTypeChange}>
        <div
          className={type ? "toggle__button" : "toggle__button buy"}
        >
          {type ? "Rent" : "Buy"}
        </div>
      </div>
    </div>
  );
};

export default TypeSwitch;
