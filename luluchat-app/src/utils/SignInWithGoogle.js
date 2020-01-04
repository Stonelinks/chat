import firebaseConfig from "./config";
import * as Google from "expo-google-app-auth";
import onSignInGoogle from "./GoogleSigInFirebase";
import { googleIosClientId, googleAndroidClientId } from "./secrets";

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: googleIosClientId,
      androidClientId: googleAndroidClientId,
      scopes: ["profile", "email"]
    });
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
