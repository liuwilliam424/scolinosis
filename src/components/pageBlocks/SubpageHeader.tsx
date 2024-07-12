/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Format subpage header
*/

import { ReactChildren } from "../../interface";
import css from "../../styles/subpage-header.module.css";
import { Container } from "../Container";
import React from "react";
//abstracted - smaller 
const SubpageHeader = ({ children }: ReactChildren) => {
  return (
    <Container
      innerClassName={css.innerContainer}
      outerClassName={css.outerContainer}
    >
      <div className={css.textContent}>{children}</div>
    </Container>
  );
};
export default SubpageHeader;
