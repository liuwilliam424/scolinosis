/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
About page
*/

import "@shoelace-style/shoelace/dist/themes/light.css";
import { Container } from "../components/Container";
import TwoItem from "../components/pageBlocks/TwoItem";
import { Content, TextBlock, Heading } from "../components/TextBlock";
import React from "react";
import SubpageHeader from "../components/pageBlocks/SubpageHeader";
import happy from "../assets/happy.jpg";
import judd from "../assets/judd.png";
import liu from "../assets/liu.jpg";
import avhad from "../assets/avhad.jpg";
import xu from "../assets/xu.jpg";
import gao from "../assets/gao.png";
import Bios from "../components/pageBlocks/Bios";
export interface Bio {
  name: string;
  image: string;
  description: string;
  tag: "CSE" | "BME";
}
const CSEBios: Bio[] = [
  {
    name: "Michael Gao",
    description: `Michael is the brain of the team. He guides the team and is always at
    the lead. He designed the algorithm and functions to process the raw
    angle values from each sensor and turn them into a single value that
    can be compared to a threshold value. He also drew the designs for
    early diagrams such as the circuit and physical model. He generally
    cleaned much of the code.`,
    image: gao,
    tag: "CSE",
  },
  {
    name: "William Liu",
    description: `William is the blood of the team. He is a key communicator and keeps
    the team together. He came up with the original circuit diagrams for
    the sensors. He also implemented and connected the Firebase database
    where the raw data is held, organizing it with authentication and
    separate users. He also created functionality to export all data for
    analysis.`,
    image: liu,
    tag: "CSE",
  },
  {
    name: "Eric Xu",
    image: xu,
    description: `Eric is the heart of the team. He is enthusiastic and motivates the
    entire team. He implemented the framework for the website, building
    the majority of the components. He also implemented the bluetooth
    connection with from the arduino to the website as well as the actual
    reception of data values from the sensors in Arduino.`,
    tag: "CSE",
  },
  {
    name: "Siddharth Avhad",
    image: avhad,
    description: ` Sid is the legs of the team. He is a steadfast presence that is always
    there. He put the physical circuit together based on the electronic
    circuit diagrams. He also collected data from experimental tests of
    the sensor to check processing. He was also responsible for
    documentation.`,
    tag: "BME",
  },
  {
    name: "William Judd",
    image: judd,
    description: `Will is the arms of the team. He is an effective teammate that works
    hard. He helped build the circuit and put it together with the harness
    to build the actual sensor. He built the container for the sensors. He
    was also responsible for the documentation.`,
    tag: "BME",
  },
];

const AboutPage = () => {
  return (
    <>
      <Container>
        <SubpageHeader>
          <h1>About Us</h1>
        </SubpageHeader>
      </Container>

      <Bios data={CSEBios} />

      <Container>
        <TwoItem height="400px">
          <img src={happy} alt="" />
          <TextBlock>
            <Heading>Our Mission</Heading>
            <Content>
              Our goal is to help children around the world identify scoliosis
              early in its development. More than 100,000 children in the United
              States are diagnosed with the disease each year, and currently,
              over 7 million people live with this condition. By using the
              scoliNOsis, diagnosis for scoliosis is easy and accurate, and with
              this product, we hope to change the lives of millions for the
              better.
            </Content>
          </TextBlock>
        </TwoItem>
      </Container>
    </>
  );
};
export default AboutPage;
