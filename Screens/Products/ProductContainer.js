import React, { useCallback, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Box,
  Icon,
  Input,
  Text,
  Center,
  Divider,
} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseUrl}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api Products call Error");
        });
      // Categories
      axios
        .get(`${baseUrl}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api Categories call Error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState([]);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text.length > 0) {
      setProductsFiltered(
        products.filter((i) =>
          i.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setProductsFiltered(products);
    }
  };

  const openList = (text) => {
    setFocus(true);
  };

  const onBlur = () => {
    refFromUseRef.current.blur();
    setSearchText("");
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  const refFromUseRef = useRef();

  return (
    <NativeBaseProvider>
      {loading == false ? (
        <Box>
          <Center px="2">
            <HStack
              my="4"
              space={5}
              w="100%"
              divider={
                <Box px="2">
                  <Divider />
                </Box>
              }
            >
              <VStack w="100%" space={5} alignSelf="center">
                <Input
                  laceholder="Search People & Places"
                  width="100%"
                  borderRadius="4"
                  py="3"
                  px="1"
                  fontSize="14"
                  InputLeftElement={
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="search" />}
                    />
                  }
                  InputRightElement={
                    <Icon
                      m="2"
                      mr="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="close" />}
                      onPress={onBlur}
                    />
                  }
                  onFocus={(text) => openList(text)}
                  ref={refFromUseRef}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onChangeText={(text) => searchProduct(text)}
                />
              </VStack>
            </HStack>
          </Center>
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No se encontraron productos.</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Box>
      ) : (
        // Loading part
        <Box style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size={"large"} color={"red"} />
        </Box>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
