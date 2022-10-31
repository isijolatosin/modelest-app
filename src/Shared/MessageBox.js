import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../constants/colors";

const MessageBox = ({ children, type }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          type === "SUCCESS" ? { color: color?.green } : { color: color?.red },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
