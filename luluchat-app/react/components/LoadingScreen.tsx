import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "../Styles";
import firebase from "../utils/firebase";

export const LoadingScreen = ({ navigation }) => {
  const isUserLoggedIn = React.useCallback(() => {
    firebase
      .auth()
      .onAuthStateChanged(user =>
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
