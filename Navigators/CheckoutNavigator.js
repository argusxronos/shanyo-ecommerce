import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Payment Screens
import Checkout from "../Screens/CartScreens/Checkout/Checkout";
import Payment from "../Screens/CartScreens/Checkout/Payment";
import Confirm from "../Screens/CartScreens/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
