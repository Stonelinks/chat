import React from "react";
import { Button, View } from "react-native";
import styles from "../Styles";
import SignOut from "../utils/SignOut";

export const DashboardScreen = () => (
  <View style={styles.container}>
    <Button onPress={SignOut} title="Sign Out" />
  </View>
);
