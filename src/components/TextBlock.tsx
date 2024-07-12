/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Text on webpage setup
*/

import React from "react";
import css from "../styles/textBlock.module.css";
import Fade from "react-reveal/Fade";

type ReactChildren = { children: React.ReactNode };
// type FC = ({ children }: { children: React.ReactNode }) => JSX.Element;
const TextBlock = ({
  children,
  noAnimation,
}: ReactChildren & { noAnimation?: boolean }) => {
  return (
    <div className={css.container}>
      {noAnimation ? children : <Fade bottom>{children}</Fade>}
    </div>
  );
};
const Heading = ({ children }: ReactChildren) => {
  return <div className={css.heading}>{children}</div>;
};
const Content = ({ children }: ReactChildren) => {
  return <div className={css.content}>{children}</div>;
};
export { TextBlock, Heading, Content };
