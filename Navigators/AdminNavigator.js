import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../Screens/AdminScreens/Orders";
import Products from "../Screens/AdminScreens/Products";
import ProductForm from "../Screens/AdminScreens/ProductForm";
import Categories from "../Screens/AdminScreens/Categories";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
