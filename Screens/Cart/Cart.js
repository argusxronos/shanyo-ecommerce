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
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <NativeBaseProvider>
      {props.cartItems.length > 0 ? (
        <Center style={styles.container}>
          <Heading style={{ alignSelf: "center" }}>Carrito</Heading>
          <FlatList
            width={width}
            data={props.cartItems}
            renderItem={({ item }) => (
              <Box
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3}>
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.product.image
                        ? item.product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.product.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      maxWidth={width * 0.8}
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.product.description}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    S/. {item.product.price}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.product._id.$oid}
          />
          <Box style={styles.bottomContainer}>
            <HStack space={3} width={width}>
              <Text style={styles.price}>Total: S/. {total}</Text>
              <Spacer />
              <Button title="Limpiar" color="#009688" alignSelf="flex-start" />
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
});

export default connect(mapStateToProps, null)(Cart);
