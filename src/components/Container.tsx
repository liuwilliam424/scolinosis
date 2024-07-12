/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Container for content
*/

import React from "react";
import css from "../styles/container.module.css";
import "simple-reveal/index.css";

import Fade from 'react-reveal/Fade';

export const Container = ({
  children,
  outerClassName = "",
  innerClassName = "",
  outerStyle,
  innerStyle,
  noAnimation,
}: {
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  outerStyle?: React.CSSProperties; //extra styles
  innerStyle?: React.CSSProperties; //extra styles
  noAnimation?: boolean;
}) => {
  return (
    //creates box to put text in
    <div
      style={outerStyle}
      className={css.outerContainer + " " + outerClassName}
    >
      <div
        className={css.innerContainer + " " + innerClassName}
        style={innerStyle}
      >
        {noAnimation ? children : <Fade bottom cascade>{children}</Fade>}
      </div>
    </div>
  );
};
