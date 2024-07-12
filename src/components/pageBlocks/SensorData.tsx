/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Receive sensor data
*/

import {
  SlDropdown,
  SlButton,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";
import { FirebaseContext } from "../../context/FirebaseContext";
import { FirebaseDoc } from "../../interface";
import ShoulderTiltData from "../ShoulderTiltData";
import TiltChart from "../TiltChart";

export interface ProcessedData {
  time: number;
  x: number;
  y: number;
  z: number;
  "Degrees Tilt": number;
}
const sessionGapSeconds = 100;
const getTimeString = (seconds: number) => {
  return new Date(seconds * 1000).toLocaleString();
};
const getProcessedData = (data: FirebaseDoc[], key: "left" | "right") => {
  const res: ProcessedData[][] = [];

  let prevTime = -Infinity;
  for (const entry of data) {
    if (entry.time.seconds - prevTime >= sessionGapSeconds) {
      res.push([]);
    }
    res[res.length - 1].push({
      time: entry.time.seconds,
      x: entry[key].orientation[0],
      y: entry[key].orientation[1],
      z: entry[key].orientation[2],
      "Degrees Tilt": parseFloat(
        Math.abs(entry[key].orientation[0] - entry[key].ground[0]).toFixed(2)
      ),
    });
    prevTime = entry.time.seconds;
  }
  return res;
};

const getAvgTilt = (data: ProcessedData[]) => {
  let sum = 0;
  for (const entry of data) sum += entry["Degrees Tilt"];
  return Math.round(sum / data.length);
};

// load data from the sensor
const SensorData = () => {
  const { loaded, getData, loggedIn } = useContext(FirebaseContext);
  const [rawData, setRawData] = useState<FirebaseDoc[]>([]);

  const [sessionIndex, setSessionIndex] = useState(0);
  useEffect(() => {
    setSessionIndex(Math.max(0, Math.min(sessionIndex, rawData.length - 1)));
  }, [rawData]);

  const processedDataLeft = getProcessedData(rawData, "left");
  const processedDataRight = getProcessedData(rawData, "right");
  const updateData = () => {
    getData().then((res) => {
      setRawData(res ?? []);
    });
  };
  useEffect(updateData, [loaded, loggedIn]);
  const sessionSelect = (data: Event) => {
    console.log(data);
  };
  // console.log(sessionIndex);
  return (
    <>
      {processedDataLeft.length > 0 ? (
        <div>
          <SlDropdown>
            <SlButton slot="trigger" caret>
              Current Session:
              {" " + getTimeString(processedDataLeft[sessionIndex][0].time)}
            </SlButton>
            <SlMenu onSlSelect={sessionSelect}>
              {processedDataLeft.map((val, i) => (
                <SlMenuItem onClick={() => setSessionIndex(i)} key={i}>
                  {getTimeString(val[0].time)}
                </SlMenuItem>
              ))}
            </SlMenu>
          </SlDropdown>
          <SlButton onClick={updateData}>Update Data</SlButton>
          <div style={{ display: "flex", marginBottom: "30px" }}>
            <div style={{ flexGrow: 1 }}>
              <h2>Left Shoulder Tilt</h2>
              <TiltChart data={processedDataLeft[sessionIndex]} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h2>Right Shoulder Tilt</h2>
              <TiltChart data={processedDataRight[sessionIndex]} />
            </div>
          </div>
          <ShoulderTiltData
            left={getAvgTilt(processedDataLeft[sessionIndex])}
            right={getAvgTilt(processedDataRight[sessionIndex])}
          />
        </div>
      ) : (
        <h3>No data found... If you&apos;re not logged in, you should do so.</h3>
      )}
    </>
  );
};
export default SensorData;
