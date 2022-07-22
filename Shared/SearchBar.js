import React,{ useEffect, useState } from 'react';
import { VStack, Input, Button, IconButton, Icon, Box, Divider, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBar = (props) => {
    const { data } = props;

    const [focus, setFocus] = useState();

    const openList = () => {
      setFocus(true);
    }

    const onBlur = () => {
      setFocus(false);
    }

    useEffect(() => {
      setFocus(false);

      return () => {
          setFocus();
      }
    }, [])

    return (
    <VStack my="4" space={5} w="100%" 
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
            InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} 
            onFocus={openList}
          />
        </VStack>
      </VStack>);
  }

  export default SearchBar;