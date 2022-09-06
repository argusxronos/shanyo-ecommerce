import React from "react";
import { View, Dimensions, StyleSheet, Button } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Container,
  HStack,
  VStack,
  Avatar,
  Spacer,
  Input,
  Text,
  Center,
  Heading,
  FlatList,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";

import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { TouchableOpacity } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  console.log(props);

  return (
    <NativeBaseProvider>
      {props.cartItems.length > 0 ? (
        <Center style={styles.container}>
          <Heading style={{ alignSelf: "center" }}>Carrito</Heading>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data, rowMap) => {
              <Cart item={data} />;
            }}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
            height={height}
          />
          <Box style={styles.bottomContainer}>
            <HStack space={3} width={width}>
              <Text style={styles.price}>Total: S/. {total}</Text>
              <Spacer />
              <Button
                title="Limpiar"
                color="#009688"
                alignSelf="flex-start"
                onPress={() => props.clearCart()}
              />
              <Button
                title="Comprar"
                color="#009688"
                alignSelf="flex-start"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </HStack>
          </Box>
        </Center>
      ) : (
        <Box alignSelf="center" style={styles.emptyContainer}>
          <Center>
            <Text>El carrito esta vacio.</Text>
            <Text>Agrega productos a tu carrito para iniciar.</Text>
          </Center>
        </Box>
      )}
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: () => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height / 2,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: width,
    justifyContent: "flex-end",
  },
  price: {
    fontSize: 18,
    margin: 10,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 0.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
