import React from "react";
import { Button, View } from "react-native";
import styles from "../Styles";
import signInWithFacebookAsync from "../utils/SignInWithFacebook";
import signInWithGoogleAsync from "../utils/SignInWithGoogle";

export const LoginScreen = () => (
  <View style={styles.container}>
    <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
    <Button title="Sign In With Facebook" onPress={signInWithFacebookAsync} />
  </View>
);
