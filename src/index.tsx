/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Base for all components and routes
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/pageBlocks/Navigation";
import AboutPage from "./pages/About";
import SensorPage from "./pages/Sensor";
import ApplicationPage from "./pages/Application";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import Missing from "./pages/404";
import { Fade } from "react-awesome-reveal";

import { FirebaseProvider } from "./context/FirebaseContext";

// create root for DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// create base path reference
setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.73/dist/"
);

// render all routing and firebase functionality with state preserved
root.render(
  <BrowserRouter>
    <FirebaseProvider>
      <Routes>
        <Route index element={<NavBar main />} />
        <Route path="*" element={<NavBar />} />
      </Routes>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sensor" element={<SensorPage />} />
        <Route path="*" element={<Missing />} />
        <Route path="application" element={<ApplicationPage />} />
      </Routes>
    </FirebaseProvider>
  </BrowserRouter>
);
