import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { DashboardScreen } from "./react/components/DashboardScreen";
import { LoadingScreen } from "./react/components/LoadingScreen";
import { LoginScreen } from "./react/components/LoginScreen";

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
