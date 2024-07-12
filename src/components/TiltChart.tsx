import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Brush,
  ReferenceLine,
} from "recharts";
import { ProcessedData } from "./pageBlocks/SensorData";
function CustomTooltip({ payload, label, active }:{payload:any,label:string,active:boolean}) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${new Date(parseInt(label)*1000).toLocaleString()} : ${payload?.[0]?.value}º`}</p>
        </div>
      );
    }
  
    return null;
  }
const TiltChart = ({ data }: { data: ProcessedData[] }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        syncId={"data"}
      >
        <XAxis
          dataKey="time"
          type="number"
          tickFormatter={(time) => new Date(time * 1000).toTimeString()}
          domain={["auto", "auto"]}
        />
        <YAxis domain={["auto", "auto"]} />

        <Tooltip content={<CustomTooltip payload={undefined} label={""} active={false}/>}/>
        <Legend />

        <Line type="monotone" dot={false} dataKey="Degrees Tilt" stroke="#000000" />

        <Brush />
        <ReferenceLine y={23} stroke="red" label="Max Safe angle" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default TiltChart;
