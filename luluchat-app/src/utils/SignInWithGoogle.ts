import * as Google from "expo-google-app-auth";
import { GoogleLogInConfig } from "expo-google-app-auth";
import onSignInGoogle from "./GoogleSigInFirebase";

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      scopes: ["profile", "email"]
    } as GoogleLogInConfig);
    if (result.type === "success") {
      onSignInGoogle(result);
      return result.accessToken;
    }
    return { cancelled: true };
  } catch (e) {
    alert(e);
    return { error: true };
  }
};

export default signInWithGoogleAsync;
