/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
interfaces to show how to properly type components
*/


export interface ReactChildren {
  children?: React.ReactNode;
}

// interfaces for sensors
export type Coords = [number, number, number];
export type SensorData = {
  orientation?: Coords;
  ground: Coords;
};

// interfaces for firebase
export interface FirebaseSensorData{
  "orientation":Coords,
  "ground":Coords
}
export interface FirebaseDoc{
  "right":FirebaseSensorData,
  "left":FirebaseSensorData,
  "time":{
    "seconds":number,
    "nanoseconds":number
  }
}