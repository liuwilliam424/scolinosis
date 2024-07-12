/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Nav bar sensor
*/

import {
  SlButton,
  SlButtonGroup,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
import { ReactNode, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import css from "../../styles/navigation.module.css";
import { Container } from "../Container";
import img from "../../assets/logo.png"

import React from "react";
import SignInButton from "../SignInButton";

const NavBar = ({ main }: { main?: boolean }) => {
  const tabs: { [label: string]: string } = {
    // navigation bar strings
    "About Our Team": "about",
    "How To Use": "application",
    "Connect Your Sensor": "sensor"
  };
  return (
    <Container
      outerClassName={css.tabContainerOuter}
      innerClassName={css.tabContainerInner}
      outerStyle={{ backgroundColor: main ? "#ddd" : "white" }}
      noAnimation
    >
            <Tab
        content={<img src={img} className={css.logo} alt="" />}
        url="/"
        main
      ></Tab>
      {Object.entries(tabs).map(([label, url], i) => {
        return <Tab content={label} url={url} key={i}></Tab>;
      })}

      <SignInButton />
    </Container>
  );
};
// setup website page tabs
const Tab = ({
  content,
  main,
  url,
}: {
  content: ReactNode;
  url: string;
  main?: boolean;
}) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return (
          css.tab +
          " " +
          (isActive ? css.active : "") +
          " " +
          (main ? css.main : "")
        );
      }}
      to={url}
    >
      {content}
    </NavLink>
  );
};

export default NavBar;
