import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  Button,
  Item,
  Select,
  View,
  CheckIcon,
  NativeBaseProvider,
} from "native-base";
import { Icon } from "react-native-vector-icons/FontAwesome";

import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MAX_LENGTH_PHONE_NUMBER } from "../../../configStore";

import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      zip,
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title={"Shipping Address"}>
          <Input
            placeholder={"Phone"}
            name={"phone"}
            value={phone}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
            maxLength={MAX_LENGTH_PHONE_NUMBER}
          />
          <Input
            placeholder={"Shipping Adrees 1"}
            name={"ShippingAddress1"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder={"Shipping Adrees 2"}
            name={"ShippingAddress2"}
            value={address2}
            onChangeText={(text) => setAddress2(text)}
          />
          <Input
            placeholder={"City"}
            name={"city"}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <Input
            placeholder={"Zip Code"}
            name={"zip"}
            value={zip}
            keyboardType={"numeric"}
            onChangeText={(text) => setZip(text)}
          />
          <Select
            selectedValue={country}
            minWidth="200"
            accessibilityLabel="Choose Country"
            placeholder="Choose Country"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            {countries.map((itemCountry) => (
              <Select.Item
                key={itemCountry.code}
                label={itemCountry.name}
                value={itemCountry.name}
              />
            ))}
          </Select>
          <View style={{ width: "80%", alignItems: "center", marginTop: 20 }}>
            <Button
              variant="outline"
              colorScheme="success"
              width={"90%"}
              title="Confirm"
              color={"white"}
              onPress={() => checkOut()}
            >
              <Text>Confirm</Text>
            </Button>
          </View>
        </FormContainer>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
