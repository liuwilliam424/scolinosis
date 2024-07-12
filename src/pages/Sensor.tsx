/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Data analysis page
*/

import { Container } from "../components/Container";
import SubpageHeader from "../components/pageBlocks/SubpageHeader";
import ConnectSensors from "../components/pageBlocks/Sensors";
import { Content, Heading, TextBlock } from "../components/TextBlock";
import React from "react";
import SensorData from "../components/pageBlocks/SensorData";

const SensorPage = () => {
  //Too many refreshes
  return (
    <>
      <SubpageHeader>
        <h1>Connect and Visualize Your Sensor Data</h1>
      </SubpageHeader>
      <Container>
        <TextBlock>
          <Heading>Usage Instructions</Heading>
          <Content>
            Sign into our website through a Google account. Then, pair the two sensors with the website: if the sensor
            has a triangle symbol, it means it is not paired, and if it has the bluetooth symbol, it is paired. Calibrate
             both with the ground. Then, equip the harness and strap in the sensors. Finally, press 
             &quot;start data recording&quot; to begin collection.
          </Content>
        </TextBlock>
        {/* connect sensors */}
        <ConnectSensors />
      </Container>
      <Container innerStyle={{textAlign:"center"}}>
        <h1>Shoulder Tilt Processed Data</h1>
        {/* process data */}
        <SensorData />
      </Container>
    </>
  );
};
export default SensorPage;
