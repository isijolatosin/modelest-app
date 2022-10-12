import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";

const Footer = ({ setShowSearch, showSearch, route }) => {
  const [active, setActive] = React.useState("");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setActive("shop");
        }}
        style={styles.icons}
      >
        <AntDesign
          name="home"
          size={25}
          color={active === "shop" ? color.gold : color.white}
        />
        <Text
          style={
            (styles.iconText,
            active === "shop"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Shop
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setShowSearch(!showSearch);
          setActive("search");
        }}
        style={styles.icons}
      >
        <AntDesign
          name="search1"
          size={25}
          color={active === "search" ? color.gold : color.white}
        />
        <Text
          style={
            (styles.iconText,
            active === "search"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActive("me");
        }}
        style={styles.icons}
      >
        <Ionicons
          name="person-outline"
          size={27}
          color={active === "me" ? color.gold : color.white}
        />
        <Text
          style={
            (styles.iconText,
            active === "me"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Me
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActive("cart");
        }}
        style={styles.icons}
      >
        <View style={styles.count}>
          <SimpleLineIcons
            name="handbag"
            size={25}
            color={active === "cart" ? color.gold : color.white}
          />
          <View style={styles.countTextWrapper}>
            <Text style={styles.countText}>0</Text>
          </View>
        </View>
        <Text
          style={
            (styles.iconText,
            active === "cart"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActive("signout");
        }}
        style={styles.icons}
      >
        <Ionicons
          name="md-log-out-outline"
          size={25}
          color={active === "signout" ? color.gold : color.white}
        />
        <Text
          style={
            active === "signout"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 }
          }
        >
          SignOut
        </Text>
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
