import * as Facebook from "expo-facebook";
import onSignInFacebook from "./FacebookSignInFirebase";
import { facebookAppId } from "./secrets";

const signInWithFacebookAsync = async () => {
  try {
    await Facebook.initializeAsync(facebookAppId);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    });

    if (type === "success") {
      onSignInFacebook(token);
    } else {
      alert("Error Response");
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export default signInWithFacebookAsync;
