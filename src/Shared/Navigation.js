import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";

const Navigation = ({ setShowBar, showBar, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagewrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home-Screen")}
          style={[styles.backWrapper]}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color={color.black}
            style={styles.back}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setShowBar(!showBar)}
        style={styles.menu}
      >
        {showBar ? (
          <EvilIcons name="close" size={25} color={color.black} />
        ) : (
          <Feather name="menu" size={25} color={color.darkgrey} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: width,
    padding: 8,
    marginBottom: -17,
  },
  back: {
    paddingHorizontal: 10,
  },
  menu: {
    paddingHorizontal: 10,
  },
  text: {
    color: color.white,
    padding: fontSizes.sm,
    fontSize: fontSizes.sm,
    textTransform: "uppercase",
  },
  imagewrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    backgroundColor: color.white,
    marginTop: -17,
    marginLeft: -10,
    marginRight: 3,
  },
  bag: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: { marginHorizontal: 12, position: "relative" },
  countTextWrapper: {
    position: "absolute",
    right: -10,
    top: -13,
    backgroundColor: color.chocolate,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderWidth: 1.5,
    borderColor: color.gold,
    borderRadius: 15,
  },
  countText: {
    color: color.white,
  },
});
