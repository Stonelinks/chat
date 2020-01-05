import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { firebaseConfig } from "./src/utils/config";
import API from "./src/utils/Firebase";

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
