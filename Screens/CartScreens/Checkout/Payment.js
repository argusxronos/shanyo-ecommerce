import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import {
  Heading,
  Box,
  Text,
  Radio,
  VStack,
  Select,
  CheckIcon,
  Button,
  NativeBaseProvider,
} from "native-base";

var { height, width } = Dimensions.get("window");

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MarterdCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <NativeBaseProvider>
      <Box>
        <Heading style={{ alignSelf: "center" }}>
          Escoge tu metodo de pago.
        </Heading>
        <VStack>
          <Radio.Group
            defaultValue="1"
            name="exampleGroup"
            accessibilityLabel="favorite colorscheme"
            onChange={(nextValue) => {
              setSelected(nextValue);
            }}
          >
            {methods.map((item, index) => {
              return (
                <Radio key={item.value} value={item.value} my={1}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
          {selected == 3 ? (
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              selectedValue={card}
              onValueChange={(itemValue) => setCard(itemValue)}
            >
              {paymentCards.map((c, index) => {
                return (
                  <Select.item key={c.code} label={c.name} value={c.name} />
                );
              })}
            </Select>
          ) : null}
          <View
            style={{
              marginTop: 60,
              alignSelf: "center",
              width: width,
            }}
          >
            <Button
              variant="outline"
              colorScheme="success"
              title={"Confirm"}
              onPress={() => props.navigation.navigate("Confirm", { order })}
            >
              <Text>Confirm</Text>
            </Button>
          </View>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default Payment;
