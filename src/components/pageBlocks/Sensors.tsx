/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Sensor coordination
*/

import { SlButton } from "@shoelace-style/shoelace/dist/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { SensorData } from "../../interface";
import { level_2D, level_3D } from "../../util/math";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import SensorStatus from "../SensorStatus";

// responsible for getting data from the sensors and also sending it to firebase
// abstracted away basically
interface SensorRef {
  ping: () => Promise<SensorData>;
  ready: boolean;
}
const ConnectSensors = () => {
  const [dataRecording, setDataRecording] = useState(false);
  const [leftReady, setLeftReady] = useState(false);
  const [rightReady, setRightReady] = useState(false);

  const leftSensorRef = useRef<SensorRef>();
  const rightSensorRef = useRef<SensorRef>();

  const { addData, loggedIn } = useContext(FirebaseContext);

  useEffect(() => {
    if (!dataRecording) return;
// sync sensors
    const intervalID = setInterval(async () => {
      if (
        !leftReady ||
        !rightReady ||
        !leftSensorRef.current ||
        !rightSensorRef.current
      ) {
        setDataRecording(false);
        return;
      }
      const promises = [
        leftSensorRef.current.ping(),
        rightSensorRef.current.ping(),
      ];

      Promise.all(promises).then((res) => {
        if (res[0].orientation && res[1].orientation) {
          addData(res[0], res[1]);
        } else {
          console.log("Something's not right!", res);
        }
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [leftSensorRef, rightSensorRef, dataRecording, leftReady, rightReady]);
  return (
    <>
      <SensorStatus
        label={"Left Sensor"}
        ref={leftSensorRef}
        setReady={setLeftReady}
      />
      <SensorStatus
        label={"Right Sensor"}
        ref={rightSensorRef}
        setReady={setRightReady}
      />
      <SlButton
        onClick={() => {
          setDataRecording(!dataRecording);
        }}
        disabled={!leftReady || !rightReady || !loggedIn}
      >{`${dataRecording ? "Stop" : "Start"} data recording`}</SlButton>
      <br /> *Note: You need to sign in to save data
    </>
  );
};
export default ConnectSensors;
