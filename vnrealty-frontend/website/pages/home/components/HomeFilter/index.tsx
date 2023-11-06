import { useState } from "react";
import SelectLocation from "./components/SelectLocation";
import TypeSwitch from "./components/TypeSwitch";

const HomeFilter = () => {
  const [type, setType] = useState<boolean>(false);
  const handleTypeChange = () => {
    setType(!type);
  };
  return (
    <div className="home1__filter row">
      <TypeSwitch type={type} handleTypeChange={handleTypeChange} />
      <SelectLocation />
    </div>
  );
};

export default HomeFilter;
