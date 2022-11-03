import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontSizes } from "../constants/fonts";
import { color } from "../constants/colors";

const Heading = ({ children, noBorder, noBtnMargin }) => {
  return (
    <View
      style={[
        noBorder
          ? {}
          : {
              borderBottomColor: color.lightgray,
              borderBottomWidth: 0.2,
            },
        noBtnMargin ? {} : { marginBottom: 10 },
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  text: { fontSize: fontSizes.md, fontWeight: "700", color: color.lightgray },
});
