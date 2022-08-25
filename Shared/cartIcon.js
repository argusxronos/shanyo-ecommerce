import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  <></>;
};

const mapStateToProps = (state) => {
  const { cartItems } = State;
  return {
    cartItems: cartItems,
  };
};
