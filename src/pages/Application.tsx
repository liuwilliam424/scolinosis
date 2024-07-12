/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
application and faq page
*/

import Header from "../components/pageBlocks/Header";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { Container } from "../components/Container";
import TwoItem from "../components/pageBlocks/TwoItem";
import { Content, TextBlock, Heading } from "../components/TextBlock";
import React from "react";
import SubpageHeader from "../components/pageBlocks/SubpageHeader";
import stepOneImage from "../assets/step1.png";
import stepTwoImage from "../assets/step2.png";
import stepThreeImage from "../assets/step3.png";
import stepFourImage from "../assets/step4.png";
import setFiveImage from "../assets/step5.png";

const ApplicationPage = () => {
  return (
    <>
      <SubpageHeader>
        <h1>How to Use</h1>
      </SubpageHeader>
      <Container>
        <TwoItem height="400px">
          <TextBlock>
            <Heading>Step 1</Heading>
            <Content>
              First, turn the harness with the loops undone so it looks like the
              orientation shown in the picture.
            </Content>
          </TextBlock>
          <img src={stepOneImage} alt="" />
        </TwoItem>
        <TwoItem height="400px">
          <img src={stepTwoImage} alt="" />
          <TextBlock>
            <Heading>Step 2</Heading>
            <Content>
              Thread the straps through the plastic holes to form loops, keeping
              the orientation the same.
            </Content>
          </TextBlock>
        </TwoItem>
        <TwoItem height="400px">
          <TextBlock>
            <Heading>Step 3</Heading>
            <Content>
              Put your arms through the holes in the harness with the connecting
              part touching your back.
            </Content>
          </TextBlock>
          <img src={stepThreeImage} alt="" />
        </TwoItem>
        <TwoItem height="400px">
          <img src={stepFourImage} alt="" />
          <TextBlock>
            <Heading>Step 4</Heading>
            <Content>
              Thread the velcro of the sensor through the strap of the harness
              and secure them both. Adjust the sensor so that it rests above the
              shoulder.
            </Content>
          </TextBlock>
        </TwoItem>
        <TwoItem height="400px">
          <TextBlock>
            <Heading>Step 5</Heading>
            <Content>
              Repeat Step 4 with the other sensor on the other shoulder. You may
              begin data gathering now.
            </Content>
          </TextBlock>
          <img src={setFiveImage} alt="" />
        </TwoItem>
      </Container>
      <SubpageHeader>
        <h1>Frequently Asked Questions</h1>
      </SubpageHeader>
      <Container>
        <TextBlock>
          <Heading>Does it matter which way I wear the harness?</Heading>
          <Content>
            No, the harness can be flipped both ways and worn in any
            orientation, but the above demonstrates the most secure way to wear
            it. If worn upside down, the sensors will be attached by the velcro.
          </Content>
        </TextBlock>
        <TextBlock>
          <Heading>Can the sensor work without Google login?</Heading>
          <Content>
            Users are unable to save their data unless they are logged into
            their Google accounts. However, logging in is as simple and allows
            the user to access many more features.
          </Content>
        </TextBlock>
        <TextBlock>
          <Heading>Does it matter which sensor goes on which shoulder?</Heading>
          <Content>
            No, each sensor is symmetrical and able to be put on either
            shoulder. As long as the orientation is correct, the sensor will
            still work as intended.
          </Content>
        </TextBlock>
        <TextBlock>
          <Heading>Is the sensor accurate?</Heading>
          <Content>
            Our sensor can detect if your shoulders are leaning in an awkward direction and serve as an early warning/detection
             system for your spine.
          </Content>
        </TextBlock>
      </Container>
    </>
  );
};
export default ApplicationPage;
