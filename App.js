import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Toast } from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigator
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";
import ProductContainer from "./Screens/ProductsScreens/ProductContainer";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
        <Toast ref={{ref} => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
}
