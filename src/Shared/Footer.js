/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { CredentialsContext } from "../components/CredentialsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import { selectItemCount } from "../slices/appSlices";
import { useSelector } from "react-redux";

const Footer = ({ route, navigation }) => {
  const [active, setActive] = React.useState("");
  const { storedCredentials } = React.useContext(CredentialsContext);
  const itemCount = useSelector(selectItemCount);

  React.useEffect(() => {
    setActive(route.name);
  }, [active]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home-Screen");
          setActive("home");
        }}
        style={styles.icons}
      >
        <AntDesign
          name="home"
          size={18}
          color={
            active === "home" && active !== "Shop-Screen"
              ? color.gold
              : color.white
          }
        />
        <Text
          style={
            (styles.iconText,
            active === "home" && active !== "Shop-Screen"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActive("category");
        }}
        style={styles.icons}
      >
        <MaterialIcons
          name="category"
          size={18}
          color={
            active === "category" && active !== "Shop-Screen"
              ? color.gold
              : color.white
          }
        />
        <Text
          style={
            (styles.iconText,
            active === "category" && active !== "Shop-Screen"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Category
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActive("me");
          storedCredentials?.email && navigation.navigate("Profile-Screen");
        }}
        style={styles.icons}
      >
        <Ionicons
          name="person-outline"
          size={18}
          color={
            active === "me" && active !== "Shop-Screen"
              ? color.gold
              : color.white
          }
        />
        <Text
          style={
            (styles.iconText,
            active === "me" && active !== "Shop-Screen"
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
          navigation.navigate("Cart-Screen");
        }}
        style={styles.icons}
      >
        <View style={styles.count}>
          <SimpleLineIcons
            name="handbag"
            size={18}
            color={
              active === "cart" && active !== "Shop-Screen"
                ? color.gold
                : color.white
            }
          />
          <View style={styles.countTextWrapper}>
            <Text style={styles.countText}>{itemCount}</Text>
          </View>
        </View>
        <Text
          style={
            (styles.iconText,
            active === "cart" && active !== "Shop-Screen"
              ? { color: color.gold, fontSize: 10 }
              : { color: color.white, fontSize: 10 })
          }
        >
          Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.darkgrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 40,
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
  icons: {
    alignItems: "center",
  },
  count: { position: "relative" },
  countTextWrapper: {
    position: "absolute",
    right: -15,
    top: -18,
    backgroundColor: color.darkgrey,
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
