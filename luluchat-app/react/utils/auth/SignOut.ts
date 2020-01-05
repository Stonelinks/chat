import firebase from "../firebase";

const SignOut = () => firebase.auth().signOut();

export default SignOut;
