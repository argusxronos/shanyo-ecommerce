import React, { useEffect, useState } from 'react'
import {     
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Dimensions,
    // Text
 } from 'react-native'
import { NativeBaseProvider, 
    VStack,
    HStack, 
    IconButton, 
    Container, 
    Box, 
    Icon, 
    Input, 
    Text,
    Center,
    Divider } from 'native-base';
import SearchBar from '../../Shared/SearchBar';
import { MaterialIcons } from '@expo/vector-icons';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';

var { height } = Dimensions.get('window');

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus ] = useState();

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
        this.Blur();
        console.log('Div lost focus');
    }

    return (
        <NativeBaseProvider>
             <Center px="2"> 
                <HStack my="4" space={5} w="100%" 
                    divider={
                            <Box px="2">
                                <Divider />
                            </Box>}>
                    <VStack w="100%" space={5} alignSelf="center">
                        <Input 
                            laceholder="Search People & Places" 
                            width="100%" 
                            borderRadius="4" 
                            py="3" 
                            px="1" 
                            fontSize="14" 
                            InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} 
                            InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="close"  />} onPress={() => onBlur }/>} 
                            
                            onFocus={openList}
                            onChangeText={(text) => searchProduct(text)}
                            onBlur={onBlur}
                        />
                    </VStack>
                </HStack>
            </Center>
            {focus == true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                />
            ) : (
                <View style={{backgroundColor: 'gainsboro' }}>
                    <Text>Product Container</Text>
                    <View>
                        <FlatList 
                            numColumns={2}
                            data={products}
                            renderItem={({item}) => <ProductList 
                                key={item.id}
                                item={item} />
                            }
                            keyExtractor={item => item.name}
                        />
                    </View>
                </View>
            )
                
            }
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: height,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default ProductContainer;