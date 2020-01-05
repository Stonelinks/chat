// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>hi</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import API from "./src/utils/Firebase";
import { DashboardScreen, LoadingScreen, LoginScreen } from "./src/screens";
import {firebaseConfig} from "./src/utils/config";

API.initializeApp(firebaseConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginScreen,
      DashboardScreen
    },
    {
      initialRouteName: "LoadingScreen"
    }
  )
);
