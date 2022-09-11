import React from "react";
import { View, Dimensions, StyleSheet, Button } from "react-native";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Avatar,
  Spacer,
  Input,
  Text,
  Center,
  Heading,
  Pressable,
  ScrollView,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { TouchableOpacity } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const { cartItems } = props;

  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  const renderItem = ({ item, index }) => (
    <Box style={styles.container}>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
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
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.product.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.product.description}
              </Text>
            </VStack>
            <Spacer />
            <Text style={styles.price}>S/.{item.product.price}</Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key, data.item)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon name="ellipsis-h" size="xs" color="coolGray.800" />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => props.removeFromCart(data.item)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon name="trash" color={"white"} size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <NativeBaseProvider borderWidth={1}>
      {cartItems.length > 0 ? (
        <Center style={styles.container}>
          <Heading style={{ alignSelf: "center" }}>Carrito</Heading>
          <SwipeListView
            data={cartItems}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-130}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            // keyExtractor={(data) => data._id.$oid}
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
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
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
    width: width,
    height: 70,
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
    fontSize: 16,
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
