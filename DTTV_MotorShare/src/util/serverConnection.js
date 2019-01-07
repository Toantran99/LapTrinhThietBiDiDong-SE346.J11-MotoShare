import {NativeModules} from "react-native";


//--------------------
//Get Localhost IP
//--------------------
export const scriptURL = NativeModules.SourceCode.scriptURL;
export const myAddress = scriptURL.split('://')[1].split('/')[0];
// const myLocalHost = "192.168.0.106";
export const myLocalHostname = myAddress.split(':')[0];
export const myPort = myAddress.split(':')[1];

export const myLocalHost = "motorshare.herokuapp.com";/*myLocalHostname+":"+myPort;*/

// export default myLocalHost;