import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Error = (props) => {
  return (
    <View styles={styles.container}>
      <Text styles={styles.text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "red",
  },
});

export default Error;
