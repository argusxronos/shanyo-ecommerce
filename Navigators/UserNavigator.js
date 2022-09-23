import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/UserScreens/Login";
import Register from "../Screens/UserScreens/Register";
import UserProfile from "../Screens/UserScreens/UserProfile";

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
