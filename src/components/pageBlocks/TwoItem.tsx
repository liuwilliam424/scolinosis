/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Two item combo view
*/

import React from "react";
import Fade from "react-reveal/Fade";

const TwoItem = ({
  children,
  height,
  style
}: {
  children: React.ReactElement[];
  height?: string;
  style?:React.CSSProperties
}) => {
  // forms grid for an image and text
  const styles: React.CSSProperties = {
    display: "flex",
    height: height ?? "300px",
    gap:"30px",
    ...style
  };
  return (
    <div style={styles}>
      <Fade bottom style={styles}>
        {children.map((el, i) =>
          React.cloneElement(el, { style: { }, key: i })
        )}
      </Fade>
    </div>
  );
};
export default TwoItem;
