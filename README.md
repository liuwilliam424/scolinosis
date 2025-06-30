# Wearable Scoliosis Sensor

## Overview
This project is a wearable sensor designed to detect early symptoms of scoliosis by monitoring the tilt of the shoulders. The sensor consists of a harness with a device on each shoulder, each housing an Arduino circuit with an MPU6050 gyroscope. The device sends tilt data to a website via Bluetooth, where it is stored in an online database and processed for interpretation. The connected app is at [scolinosis.williamzliu.com](https://scolinosis.williamzliu.com)

## Features
- Early detection of scoliosis symptoms.
- Continuous monitoring over long periods.
- User alerts when symptoms indicate early scoliosis.

## Methodology
The sensor detects scoliosis symptoms by measuring shoulder tilt in three dimensions using gyroscopes:
1. **Data Collection**: Gyroscopes on each shoulder take angle data in three dimensions.
2. **Threshold Comparison**: The device calculates gyroscope plane values and compares them to predefined threshold values.
3. **User Notification**: If threshold values are reached, the device informs the wearer.

## Requirements
This project requires the physical sensor device. Without the physical device, the software will not function correctly.

## Usage
1. **Wearing the Sensor**: Strap the sensor harness on the shoulders, ensuring each device is securely positioned.
2. **Connecting to the Website**: Connect the sensor to the website via Bluetooth using an electronic device.
3. **Data Monitoring**: The sensor continuously sends data to the online database for processing.
4. **Alerts and Notifications**: If irregular shoulder tilt is detected, the user will be informed to seek further medical advice.
