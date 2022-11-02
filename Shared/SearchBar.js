import React, { useEffect, useState, useRef } from "react";
import { VStack, Input, Icon, Box, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const onBlur = () => {
    refFromUseRef.current.blur();
    props.setSearchText("");
    props.searchProduct("");
  };

  const refFromUseRef = useRef();

  return (
    <VStack
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
          placeholder="search"
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
              as={<MaterialIcons name="cancel" />}
              onPress={onBlur}
            />
          }
          onChangeText={props.onChangeText}
          ref={refFromUseRef}
          value={props.searchText}
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;
