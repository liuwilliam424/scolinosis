/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Sign in with google
*/

import { SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";
import React, { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import googleLogo from "../assets/google.svg";
const SignInButton = () => {
  const { signIn, loggedIn, signOut, loaded } = useContext(FirebaseContext);
  return (
    <>
      {loggedIn || !loaded ? (
        //google authentication
        <SlButton onClick={signOut} size="large" loading={!loaded}>
          Sign out
        </SlButton>
      ) : (
        <SlButton onClick={signIn} size="large" loading={!loaded}>
          <SlIcon slot="prefix" src={googleLogo}></SlIcon>
          Sign in with Google
        </SlButton>
      )}
    </>
  );
};
export default SignInButton;
