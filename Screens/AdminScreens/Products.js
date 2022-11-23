import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  HStack,
  Center,
  NativeBaseProvider,
  Heading,
  Input,
} from "native-base";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import Searchbar from "../../Shared/SearchBar";
import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={styles.titleColumn}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.titleColumn}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.titleColumn}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.titleColumn}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [searchText, setSearchText] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
    setSearchText(text);
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.buttomContainer}>
          <EasyButton
            secondary
            medium
            onPress={() => props.navigation.navigate("Orders")}
          >
            <Text style={{ color: "white", marginLeft: 4 }}>Orders</Text>
          </EasyButton>
          <EasyButton
            secondary
            medium
            onPress={() => props.navigation.navigate("ProductForm")}
          >
            <Text style={{ color: "white", marginLeft: 4 }}>Products</Text>
          </EasyButton>
          <EasyButton
            secondary
            medium
            onPress={() => props.navigation.navigate("Categories")}
          >
            <Text style={{ color: "white", marginLeft: 4 }}>Categories</Text>
          </EasyButton>
        </View>
        <View>
          <Searchbar
            onChangeText={(text) => searchProduct(text)}
            searchProduct={searchProduct}
            setSearchText={setSearchText}
            searchText={searchText}
          />
        </View>

        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size={"large"} color="red" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  delete={deleteProduct}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  titleColumn: {
    fontWeight: "bold",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttomContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttomText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Products;
