import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CryptoDetails from "../components/CryptoDetails";
import Dashboard from "../screens/Dashboard";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { headerStyle } from "../utils/HeaderStyles/HeaderStyle";

// all the routes available in the app
export type RouteParams = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CryptoDetails: undefined;
};

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} options={headerStyle} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={headerStyle}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CryptoDetails"
          component={CryptoDetails}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
