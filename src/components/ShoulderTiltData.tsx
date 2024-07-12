import React from "react";

import css from "../styles/shoulderTiltData.module.css";
const ShoulderTiltData = ({ left, right }: { left: number; right: number }) => {
  const avg = Math.round((left + right) / 2);
  const safe = avg < 23;
  return (
    <div className={css.container}>
      <div className={css.angleData}>
        <div>
          <div className={css.topHeading}>Left</div>
          <div className={css.number}>{left}º</div>
        </div>
        <div>
          <div className={css.topHeading}>Right</div>
          <div className={css.number}>{right}º</div>
        </div>
        <div>
          <div className={css.topHeading}>Avg.</div>
          <div className={css.number}>{avg}º</div>
        </div>
      </div>
      <div className={css.verdict + " " + (safe ? css.safe : css.unsafe)}>
        {safe
          ? "Looks good! You don't seem to have any signs of scoliosis"
          : "A significant tilt deviation has been detected; Please seek medical attention if this trend persists"}
      </div>
    </div>
  );
};
export default ShoulderTiltData;
