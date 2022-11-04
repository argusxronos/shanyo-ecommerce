import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { HStack, Center, NativeBaseProvider, Heading } from "native-base";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

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
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
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
            <EasyButton
              primary
              medium
              onPress={() => {
                props.addItemToCart(item),
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: `${item.name} added to Cart`,
                    text2: "Go to your cart to complete order.",
                  });
              }}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </EasyButton>
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
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapToDispachToProps)(SingleProduct);
