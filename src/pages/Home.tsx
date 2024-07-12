/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
landing page
*/

import Header from "../components/pageBlocks/Header";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { Container } from "../components/Container";
import TwoItem from "../components/pageBlocks/TwoItem";
import { Content, TextBlock, Heading } from "../components/TextBlock";
import React from "react";

import xrayspine from "../assets/human_curved_spine.png";
import sensor1 from "../assets/sensor.png"
import sensor2 from "../assets/sensor2.png"

function App() {
  return (
    <>
      <Header></Header>
      <Container>
        <TwoItem height="400px">
          <TextBlock>
            <Heading>What is Scoliosis?</Heading>
            <Content>
              Scoliosis is defined as the condition where the spine twists and
              curves to the side. The curve can be stable or worsen over time.
              Mild cases typically do not cause problems, but the condition can
              worsen and eventually affect movement and breathing. Scoliosis
              most commonly appears among adolescents between ages ten and
              twenty. The cause of scoliosis is unknown. It can sometimes appear
              due to other conditions such as cerebral palsy or muscular
              dystrophy. Oftentimes, treatment is uncessary. However, some may
              need to wear a brace to stop their condition from worsening. Other
              treatment includes exercises and surgery. The best way to deal
              with scoliosis is to detect it early on, and take the necessary
              preventatives.
            </Content>
          </TextBlock>
          <img src={xrayspine} alt="" />
        </TwoItem>
      </Container>
      <Container>
        <TwoItem height="400px">
          <img src={sensor1} alt="imageofsensor" />
          <TextBlock>
            <Heading>What Our Sensor Does</Heading>
            <Content>
              Our wearable sensor is a harness with a device on each shoulder.
              Each device is a container that contains an arduino circuit with a
              MPU6050 gyroscope. Our sensor takes data from the tilts of each
              shoulder to detect early symptoms of scoliosis. The device
              connects with the website on an electronic through bluetooth. The
              data is sent to an online database, and eventually gets processed
              for interpretation. The sensor is designed to be worn over long
              periods of time, and will inform the user when their symptoms
              indicate signs of early scoliosis, and that they should seek
              further medical advice.
            </Content>
          </TextBlock>
        </TwoItem>
      </Container>
      <Container innerStyle={{ textAlign: "center" }}>
      <Heading>Methodology</Heading>
        <Content>
          How does it detect symptoms of scoliosis? A common symptom of
          scoliosis is irregular shoulder tilt. However, by the time it is
          visible, the symptoms     are usually too severe. Our device has a
          gyroscope on each shoulder that takes angle data from all three
          dimensions. Our device detects irregular          shoulder tilt by calculating
          the gyroscope plane values, and comparing it
          to the threshold values. It will compare data values to references and
          inform     the wearer if the threshold value is reached.
        </Content>
        <img src={sensor2} />
      </Container>
    </>
  );
}

export default App;
