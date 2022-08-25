import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {
  ListItem,
  FlatList,
  Image,
  Text,
  Box,
  Heading,
  HStack,
  VStack,
  Avatar,
  Spacer,
} from "native-base";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <Box style={{ width: width }}>
      <Heading fontSize="xl" p="4" pb="3">
        Resultados de la Busqueda:
      </Heading>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Product Detail", { item: item });
                }}
              >
                <HStack space={3} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.image
                        ? item.image
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
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.description}
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
                    {item.price}
                  </Text>
                </HStack>
              </TouchableOpacity>
            </Box>
          )}
          keyExtractor={(item) => item._id.$oid}
        />
      ) : (
        <View style={StyleSheet.center}>
          <Text style={{ alignSelf: "center" }}>
            No se encontraron productos.
          </Text>
        </View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProduct;
