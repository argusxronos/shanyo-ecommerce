import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { HStack, Center, NativeBaseProvider, Heading } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <NativeBaseProvider>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Heading style={styles.contentHeader}>{item.name}</Heading>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        {/* TODO: Descripction, Rich Descrciption and Availability */}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <HStack
          style={styles.bottomContainer}
          space={2}
          justifyContent="center"
        >
          <Center
            flex={0.7}
            h="10"
            w="20"
            bg="primary.300"
            rounded="md"
            shadow={3}
          >
            <Text style={styles.price}>S/. {item.price}</Text>
          </Center>
          <Center
            flex={0.3}
            h="10"
            w="20"
            bg="primary.300"
            rounded="md"
            shadow={3}
          >
            <Button
              style={styles.buttonAdd}
              title="Agregar"
              onPress={() => {
                props.addItemToCart(item);
              }}
            />
          </Center>
        </HStack>
      </View>
    </NativeBaseProvider>
  );
};

const mapToDispachToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
  },
  price: {
    fontSize: 24,
    color: "red",
  },
  buttonAdd: {
    color: "white",
  },
});

export default connect(null, mapToDispachToProps)(SingleProduct);
