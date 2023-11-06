import { keyBy } from "lodash";
import React from "react";

const locationData = [
  {
    id: 1,
    zone: "Alaskan/Hawaiian",
    places: ["Alaska", "Hawaii"],
  },
  {
    id: 2,
    zone: "Pacific",
    places: ["California", "Nevada", "Oregon", "Washington"],
  },
];

const SelectLocation = () => {
  return (
    <div className="select-location col-lg-3 col-md-6 col-12 bottommargin-sm">
      <label>CHOOSE LOCATION</label>

      {/*  */}
      {locationData.map((item) => (
        <div key={item.id}>
          <h2>{item.zone} Time Zone</h2>
          <div>
            {item.places.map((place, index) => (
              <p key={index}>{place}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectLocation;
