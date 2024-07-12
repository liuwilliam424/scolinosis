/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Sensor setup with arduino
*/

import { useCallback, useEffect, useMemo, useState } from "react";

function parseAngles(val: DataView) {
  const enc = new TextDecoder("utf-8");
  const values = enc
    .decode(val)
    .split("/")
    .map((val) => parseFloat(val));
  return values as [number, number, number];
}

const useSensor = () => {
  //sensor identification
  const UUID = "19B10010-E8F2-537E-4F6C-D104768A1214".toLowerCase();
  const XYZ_ID = "19B10011-E8F2-537E-4F6C-D104768A1211".toLowerCase();
  const SEND_DATA_ID = "19B10011-E8F2-537E-4F6C-D104768A1215".toLowerCase();

  const [coords, setCoords] = useState<[number, number, number]>([0, 0, 0]);
  const [service, setService] = useState<BluetoothRemoteGATTService>();
  const [server, setServer] = useState<BluetoothRemoteGATTServer>();

  const setup = async () => {
    //promise with async
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [UUID] }],
    });
    if (device.gatt) {
      const server = await device.gatt.connect();
      setServer(server);
    }
  };
  const disconnect = () => {
    //handle disconnection
    server?.disconnect();
    setServer(undefined);
    setCoords([0,0,0]);
  };
  useEffect(() => {
    if (server && server.connected) {
      server.getPrimaryService(UUID).then((service) => {
        setService(service);
        startDataStream(service);
      });
    } else {
      setService(undefined);
    }
  }, [server]);
  function startDataStream(service: BluetoothRemoteGATTService) {
    service
      .getCharacteristic(XYZ_ID)
      .then((characteristic) => characteristic.startNotifications())
      .then((characteristic) =>
        characteristic.addEventListener(
          "characteristicvaluechanged",
          (val: any) => {
            const new_coords = parseAngles(val.target.value);
            setCoords([...new_coords]);
          }
        )
      );
  }
  const ping = useCallback(async () => {
    if (!service) {
      return undefined;
    } else {
      try {
        //get raw data
        const update_characteristic = await service.getCharacteristic(
          SEND_DATA_ID
        );
        await update_characteristic.writeValue(Uint8Array.of(1));
        return parseAngles(
          await (await service.getCharacteristic(XYZ_ID)).readValue()
        );
      } catch (error) {
        setServer(undefined);
        return undefined;
      }
    }
  }, [SEND_DATA_ID, service, server]);

  return {
    coords,
    setup,
    disconnect,
    ping,
    sensorReady: !!server && !!service,
  };
};

export default useSensor;
