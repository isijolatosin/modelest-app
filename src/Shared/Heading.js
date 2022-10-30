import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontSizes } from "../constants/fonts";
import { color } from "../constants/colors";

const Heading = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  text: { fontSize: fontSizes.md, fontWeight: "700", color: color.lightgray },
});
