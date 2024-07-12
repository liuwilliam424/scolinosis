/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Header of website
*/
import css from "../../styles/header.module.css";
import { Container } from "../Container";
import React from "react";
const Header = () => {
  return (
    <Container
      innerClassName={css.innerContainer}
      outerClassName={css.outerContainer}
    >
      {/* header text */}
      <div className={css.textContent}>
        <h1>Reinventing Scoliosis Care</h1>
        <h2>Detect, Identify, Prevent</h2>
      </div>
    </Container>
  );
};
export default Header;
