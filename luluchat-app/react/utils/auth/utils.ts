import firebase from "../firebase";

export const isUserEqualGoogle = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const { providerData } = firebaseUser;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        return true;
      }
    }
  }
  return false;
};

export const isUserEqualFacebook = (facebookAuthResponse, firebaseUser) => {
  if (firebaseUser) {
    const { providerData } = firebaseUser;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
        providerData[i].uid === facebookAuthResponse.userID
      ) {
        // We don't need to re-auth the firebase connection.
        return true;
      }
    }
  }
  return false;
};
