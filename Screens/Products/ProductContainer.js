import React, { useEffect, useState } from 'react'
import {     
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Dimensions
 } from 'react-native'
import ProductList from './ProductList';
import { Container, Header, Icon, Item, Imput, Text } from 'native-base';

var { height } = Dimensions.get('window')

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([])
        }
    }, [])

    return (
        <View>
            <View style={{marginTop: 100, backgroundColor: 'gainsboro' }}>
                <Text>Product Container</Text>
                <View style={StyleSheet.container}>
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
        </View>
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