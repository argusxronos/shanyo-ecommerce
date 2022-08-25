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

  return (
    <NativeBaseProvider>
      {props.cartItems.length > 0 ? (
        <Center borderWidth={1} height={height - 160}>
          <Heading style={{ alignSelf: "center" }}>Carrito</Heading>
          <FlatList
            borderWidth={1}
            width={width}
            data={props.cartItems}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
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
          <View style={styles.bottomContainer}>
            <HStack space={3}>
              <Text style={styles.price}>S/. {total}</Text>
              <Spacer />
              <Button title="Limpiar" alignSelf="flex-start" />
              <Button
                title="Comprar"
                style={styles.button}
                alignSelf="flex-start"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </HStack>
          </View>
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
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default connect(mapStateToProps, null)(Cart);
