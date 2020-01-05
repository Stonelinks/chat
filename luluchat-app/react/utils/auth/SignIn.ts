import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { GoogleLogInConfig } from "expo-google-app-auth";
import { appName } from "../config";
import firebase from "../firebase";
import { isUserEqualFacebook, isUserEqualGoogle } from "./utils";

export const onSignInGoogle = googleUser => {
  // We need to register an Observer on firebase Auth to make sure auth is
  // initialized.
  const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
    unsubscribe();
    // Check if we are already signed-in firebase with the correct user.
    if (!isUserEqualGoogle(googleUser, firebaseUser)) {
      // Build firebase credential with the Google ID token.
      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(response => {
          if (response.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref(`users/${response.user.uid}`)
              .set({
                email: response.user.email,
                firstName: (response.additionalUserInfo.profile as any)
                  .given_name,
                lastName: (response.additionalUserInfo.profile as any)
                  .family_name,
                locale: (response.additionalUserInfo.profile as any).locale,
                profilePicture: (response.additionalUserInfo.profile as any)
                  .picture,
                createdAt: Date.now(),
                lastLogIn: Date.now()
              });
          } else {
            firebase
              .database()
              .ref(`users/${response.user.uid}`)
              .update({
                lastLogIn: Date.now()
              });
          }
        })
        .catch(err => alert(err));
    } else {
      alert("User already signed-in firebase.");
    }
  });
};

export const signInWithGoogleAsync = async () => {
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

export const onSignInFacebook = token => {
  if (token) {
    const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      if (!isUserEqualFacebook(token, firebaseUser)) {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(response => {
            if (response.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref(`users/${response.user.uid}`)
                .set({
                  firstName: (response.additionalUserInfo.profile as any)
                    .first_name,
                  lastName: (response.additionalUserInfo.profile as any)
                    .last_name,
                  email: response.user.email,
                  phoneNumber: response.user.phoneNumber,
                  profilePicture: (response.additionalUserInfo.profile as any)
                    .picture.data.url,
                  createdAt: Date.now(),
                  lastLogIn: Date.now()
                });
            } else {
              firebase
                .database()
                .ref(`users/${response.user.uid}`)
                .update({
                  lastLogIn: Date.now()
                });
            }
          })
          .catch(err => alert(err));
      } else {
        alert("User already signed-in firebase.");
      }
    });
  } else {
    firebase.auth().signOut();
  }
};

export const signInWithFacebookAsync = async () => {
  try {
    await Facebook.initializeAsync(process.env.FACEBOOK_APP_ID, appName);
    const { type, token } = (await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    })) as {
      type: string;
      token: string;
    };

    if (type === "success") {
      onSignInFacebook(token);
    } else {
      alert("Error Response");
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
