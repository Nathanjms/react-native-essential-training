# Setup

## To set up (wireless) adb for android device

1. Run `adb tcpip 5555`
2. Find ip address of phone in settings
3. Run `adb connect {ip-address}:5555`
4. Then do the below

## To launch app on Android device/Emulator

1. Run `npx react-native start`
2. Run `npx react-native run-android`



