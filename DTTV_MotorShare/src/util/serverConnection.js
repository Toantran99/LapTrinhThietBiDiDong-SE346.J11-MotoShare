import {NativeModules} from "react-native";


//--------------------
//Get Localhost IP
//--------------------
export const scriptURL = NativeModules.SourceCode.scriptURL;
export const myAddress = scriptURL.split('://')[1].split('/')[0];
// const myLocalHost = "192.168.0.106";
export const myLocalHost = myAddress.split(':')[0];
export const myPort = myAddress.split(':')[1];

// export default myLocalHost;