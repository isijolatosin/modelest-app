import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import { variables } from "../constants/variables";

const Footer = ({ setShowBar, showBar }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icons}>
        <AntDesign name="home" size={25} color={color.white} />
        <Text style={styles.iconText}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons}>
        <Ionicons name="person-outline" size={27} color={color.white} />
        <Text style={styles.iconText}>Me</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons}>
        <View style={styles.count}>
          <SimpleLineIcons name="handbag" size={25} color={color.white} />
          <View style={styles.countTextWrapper}>
            <Text style={styles.countText}>0</Text>
          </View>
        </View>
        <Text style={styles.iconText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons}>
        <AntDesign name="search1" size={25} color={color.white} />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons}>
        <Ionicons name="md-log-out-outline" size={25} color={color.white} />
        <Text style={styles.iconText}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.chocolate,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingBottom: 70,
    // paddingTop: Platform.OS === variables.isAndroid ? 20 : 10,
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
    backgroundColor: color.chocolate,
  },
  icons: {
    alignItems: "center",
  },
  iconText: {
    color: color.white,
    fontSize: fontSizes.xs,
    marginTop: 2,
  },
  count: { position: "relative" },
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
    borderColor: color.white,
    borderRadius: 15,
  },
  countText: {
    color: color.white,
  },
});
