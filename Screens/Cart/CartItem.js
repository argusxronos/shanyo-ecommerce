import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Text,
  HStack,
  FlatList,
  Box,
  Avatar,
  VStack,
  Spacer,
} from "native-base";

var { height, width } = Dimensions.get("window");

const CartItem = (props) => {
  //   const data = props.item.product;
  //   const { quantity, setQuantity } = useState(props.item.quantity);

  return (
    <Text>HOla mundo</Text>
    // <FlatList
    //   width={width}
    //   data={props.cartItems}
    //   renderItem={({ item }) => (
    //     <Box
    //       _dark={{
    //         borderColor: "gray.600",
    //       }}
    //       borderColor="coolGray.200"
    //       pl="4"
    //       pr="5"
    //       py="2"
    //     >
    //       <HStack space={3}>
    //         <Avatar
    //           size="48px"
    //           source={{
    //             uri: item.product.image
    //               ? item.product.image
    //               : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
    //           }}
    //         />
    //         <VStack>
    //           <Text
    //             _dark={{
    //               color: "warmGray.50",
    //             }}
    //             color="coolGray.800"
    //             bold
    //           >
    //             {item.product.name}
    //           </Text>
    //           <Text
    //             color="coolGray.600"
    //             maxWidth={width * 0.8}
    //             _dark={{
    //               color: "warmGray.200",
    //             }}
    //           >
    //             {item.product.description}
    //           </Text>
    //         </VStack>
    //         <Spacer />
    //         <Text
    //           fontSize="xs"
    //           _dark={{
    //             color: "warmGray.50",
    //           }}
    //           color="coolGray.800"
    //           alignSelf="flex-start"
    //         >
    //           S/. {item.product.price}
    //         </Text>
    //       </HStack>
    //     </Box>
    //   )}
    //   keyExtractor={(item) => item.product._id.$oid}
    // />
  );
};

export default CartItem;
