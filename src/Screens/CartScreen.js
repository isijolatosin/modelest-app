import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../constants/colors";

const CartScreen = ({ navigation }) => {
  return (
    <View>
      <Text>CartScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backWrapper]}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={30}
          color={color.white}
          style={styles.back}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  backWrapper: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 50,
  },
});
