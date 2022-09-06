import React from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  const badge = props.cartItems.length ? (
    <Badge
      colorScheme="danger"
      rounded="full"
      mb={-4}
      mr={-4}
      variant="solid"
      alignSelf="flex-end"
      _text={{
        fontSize: 12,
      }}
      zIndex={1}
    >
      {props.cartItems.length}
    </Badge>
  ) : null;

  return badge;
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CartIcon);
