import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Container,
  Heading,
  HStack,
  Box,
  FlatList,
  Text,
  Radio,
  VStack,
  Spacer,
  Icon,
  Select,
  CheckIcon,
  Button,
} from "native-base";

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
    <Container>
      <Heading style={{ alignSelf: "center" }}>
        Escoge tu metodo de pago.
      </Heading>
      <VStack>
        {methods.map((item, index) => {
          return (
            <FlatList>
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                    key={item.code}
                  >
                    {item.name}
                  </Text>
                </VStack>
                <Spacer />
                <Radio selected={selected == item.value} />
              </HStack>
            </FlatList>
          );
        })}
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
              return <Select.item key={c.code} label={c.name} value={c.name} />;
            })}
          </Select>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </VStack>
    </Container>
  );
};

export default Payment;
