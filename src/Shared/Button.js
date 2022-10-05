import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ title, size, bgclr, clr, width }) => {
  return (
    <View style={[styles.container, { backgroundColor: bgclr, width: width }]}>
      <Text style={[styles.text, { fontSize: size, color: clr }]}>{title}</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    //  color: color.white,
  },
});
