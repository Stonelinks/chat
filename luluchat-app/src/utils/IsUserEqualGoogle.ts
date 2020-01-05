import API from "./Firebase";

const isUserEqualGoogle = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const { providerData } = firebaseUser;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          API.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        return true;
      }
    }
  }
  return false;
};

export default isUserEqualGoogle;
