# Setup

## To set up (wireless) adb for android device

1. Run `adb pair {ip-address}:{port}`
2. Find ip address of phone in settings
3. Run `adb connect {ip-address}:{port}`

## To launch app on Android device/Emulator

1. Run `npx react-native start`
2. Run `npx react-native run-android`

## To setup and use react-devtools with wireless adb

1. Install globally with `sudo npm i -g react-devtools`
2. Possibly run `adb reverse tcp:8097 tcp:8097` (unconfirmed if this is what made it work)
3. Run `react-devtools`
4. On terminal where `npx react-native start` was ran, press 'r' to refresh, then 'd' to debug
5. This hopefully connects react-devtools to the adb device


