import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, HStack, Badge, Text, View } from 'native-base';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor:'#f2f2f2' }}
        >
        <Stack space={3} alignItems="center">
            <HStack name='HorizontalStack' style={{ margin: 0, padding: 0, borderRadius: 0 }} justifyContent="center">
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 5, borderRadius: 15},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>All</Text>
                    </Badge>
                </TouchableOpacity>
                {
                    props.categories.map((item) => {
                        return <TouchableOpacity
                            key={item._id.$oid}
                            onPress={() => {
                                props.categoryFilter(item._id.$oid), 
                                props.setActive(props.categories.indexOf(item))
                            }}
                        >
                            <Badge
                                style={[styles.center, {margin: 5, borderRadius: 15},
                                    props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                                ]}
                            >
                                <Text style={{color: 'white'}}>{item.name}</Text>
                            </Badge>
                        </TouchableOpacity>
                    })
                }
            </HStack>
        </Stack>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;