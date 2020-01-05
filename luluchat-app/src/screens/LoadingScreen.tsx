/* eslint-disable react/prop-types */
import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "../Styles";
import API from "../utils/Firebase";

export const LoadingScreen = ({ navigation }) => {
  const isUserLoggedIn = React.useCallback(() => {
    API.auth().onAuthStateChanged(user =>
      user
        ? navigation.navigate("DashboardScreen")
        : navigation.navigate("LoginScreen")
    );
  }, [navigation]);

  React.useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};
