import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item, NativeBaseProvider, Select, VStack } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as imagePicker from "expo-image-picker";

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [nameImage, setNameImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permitions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!(result.canceled || result.canceled == "undefined")) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <NativeBaseProvider>
      <FormContainer title="Add Product">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon style={{ color: "white" }} name="camera" />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
        </View>
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType={"numeric"}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          onChangeText={(text) => setCountInStock(text)}
          keyboardType={"numeric"}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Descrioption</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <VStack alignItems="center" space={4}>
          <Select
            minWidth={200}
            variant="unstyled"
            accessibilityLabel="Select your favorite programming language"
            placeholder="Select your Category"
            // dropdownCloseIcon={<Icon color={"#007aff"} name="arrow-down" />}
            selectedValue={pickerValue}
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Select.Item key={c.id} value={c.id} label={c.name} />;
            })}
          </Select>
        </VStack>
        {err ? <Error message={err} /> : null}
        <View style={styles.buttonContainer}>
          <EasyButton
            large
            primary
            // onPress
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  canceled: false,
  cancelled: false,
});

export default ProductForm;
