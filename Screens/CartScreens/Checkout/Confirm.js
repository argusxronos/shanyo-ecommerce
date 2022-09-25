import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  Text,
  Spacer,
  HStack,
  VStack,
  NativeBaseProvider,
  Avatar,
  Button,
} from "native-base";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var { height } = Dimensions.get("window");

const Confirm = (props) => {
  const confirm = props.route.params;
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Confirm Order.
          </Text>
          {props.route.params ? (
            <View style={{ borderWidth: 1, borderColor: "orange" }}>
              <Text style={styles.title}>Shipping to:</Text>
              <View style={{ padding: 8 }}>
                <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                <Text>City: {confirm.order.order.city}</Text>
                <Text>Zip Code: {confirm.order.order.zip}</Text>
                <Text>Country: {confirm.order.order.country}</Text>
              </View>
              <Text style={styles.title}>Items:</Text>
              {confirm.order.order.orderItems.map((item) => {
                return (
                  <HStack space={3} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.product.image
                          ? item.product.image
                          : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                      }}
                    />
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                      alignSelf={"center"}
                    >
                      {item.product.name}
                    </Text>
                    <Spacer />
                    <Text
                      fontSize="14"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="center"
                    >
                      {item.product.price}
                    </Text>
                  </HStack>
                );
              })}
            </View>
          ) : null}
          <View style={{ alignItems: "center", margin: 20 }}>
            <Button onPress={confirmOrder}>
              <Text>Place Order</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
