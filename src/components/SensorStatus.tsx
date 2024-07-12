/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Analysis of sensor data
*/

import css from "../styles/sensor.module.css";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";
import { Coords, SensorData } from "../interface";
import useSensor from "../hooks/useSensor";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
//calibration stages
type Status = "READY" | "NEEDS_CALIBRATION" | "CALIBRATING" | "DISCONNECTED";

const SensorStatus = (
  {
    label,
    setReady,
  }: {
    label: string;
    setReady: (ready: boolean) => void;
  },
  ref: React.Ref<unknown>
) => {
  // only do setpingfunction when sensor is ready and calibrated
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationData, setCalibrationData] = useState<Coords>();
  const { coords, setup, ping, sensorReady, disconnect } = useSensor();

  //calibration text
  const statusLabels: { [status in Status]: string } = {
    READY: "Disconnect",
    NEEDS_CALIBRATION: "Calibrate",
    CALIBRATING: "Calibrating...",
    DISCONNECTED: "Connect",
  };
  const userFriendlyStatus: { [status in Status]: string } = {
    READY: "Ready!",
    NEEDS_CALIBRATION: "Needs Calibration",
    CALIBRATING: "Calibrating...",
    DISCONNECTED: "Not Connected",
  };
  const wait = (ms: number) => new Promise((re) => setTimeout(re, ms));

  const calibrate = async () => {
    await ping();
    setCalibrating(true);
    await wait(2000);
    setCalibrationData(await ping());
    setCalibrating(false);
  };
  const statusMethods: { [status in Status]?: (...args: any[]) => unknown } = {
    NEEDS_CALIBRATION: calibrate,
    DISCONNECTED: setup,
    READY: () =>{
      setCalibrationData(undefined);
      disconnect();
    }
  };
  const statusTip: { [status in Status]?: string } = {
    NEEDS_CALIBRATION:
      "To calibrate, simply place the box flat the ground with the lid facing up and press the calibrate button.",
  };
  //change to sensorReady
  const status: Status = sensorReady
    ? calibrationData
      ? "READY"
      : calibrating
      ? "CALIBRATING"
      : "NEEDS_CALIBRATION"
    : "DISCONNECTED";

  useEffect(() => {
    setReady(status === "READY");
  }, [status]);

  useImperativeHandle(
    ref,
    () => {
      return {
        ping: async () => {
          return {
            orientation: await ping(),
            ground: calibrationData,
          };
        },
      };
    },
    [status]
  );
  return (
    //display status in box
    <div className={css.container}>
      <Tippy content={userFriendlyStatus[status]}>
        <div className={css.status + " " + css[status]}></div>
      </Tippy>
      <h3 className={css.label}>{label}</h3>
      <h3>({coords.join(",")})</h3>
      <div>
        <SlButton
          variant="text"
          size="large"
          disabled={!statusMethods[status]}
          onClick={statusMethods[status]}
        >
          {statusLabels[status]}
        </SlButton>
        {statusTip[status] && (
          <Tippy content={statusTip[status]}>
            <SlIcon name="question-circle" slot="suffix" />
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default forwardRef(SensorStatus);
