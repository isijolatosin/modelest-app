import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { variables } from "../constants/variables";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";

const SideBar = ({ navigation, setShowBar }) => {
  const [menuSelect, setMenuSelect] = React.useState("");

  const HandleMenu = (e) => {
    // console.log(e)
    if (menuSelect) {
      setMenuSelect("");
    } else {
      setMenuSelect(e);
    }
  };

  return (
    <View
      style={
        Platform.OS === variables.isAndroid
          ? [styles.elevation, styles.menu]
          : [styles.shadowProp, styles.menu]
      }
    >
      {variables.menu.map((item) => (
        <View style={styles.textCont} key={item.id} id={item.title}>
          <TouchableOpacity onPress={() => HandleMenu(item.title)}>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
          {item.title === "indian" && (
            <View>
              {menuSelect === "indian" &&
                variables.subLinks1.map((i) => (
                  <TouchableOpacity style={styles.textSubCont} key={i.id}>
                    <Text style={styles.subText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {item.title === "virgin" && (
            <View>
              {menuSelect === "virgin" &&
                variables.subLinks2.map((i) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Virgin-wigs-Screen", {
                        parameter: "virgin",
                      });
                      setShowBar(false);
                    }}
                    style={styles.textSubCont}
                    key={i.id}
                  >
                    <Text style={styles.subText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {item.title === "vietnamese" && (
            <View>
              {menuSelect === "vietnamese" &&
                variables.subLinks3.map((i) => (
                  <TouchableOpacity style={styles.textSubCont} key={i.id}>
                    <Text style={styles.subText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {item.title === "deals" && (
            <View>
              {menuSelect === "deals" &&
                variables.subLinks4.map((i) => (
                  <TouchableOpacity style={styles.textSubCont} key={i.id}>
                    <Text style={styles.subText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {item.title === "help" && (
            <View>
              {menuSelect === "help" &&
                variables.subLinks5.map((i) => (
                  <TouchableOpacity style={styles.textSubCont} key={i.id}>
                    <Text style={styles.subText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  menu: {
    backgroundColor: color.whiteTrans,
    color: color.black,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    width: 250,
    overflow: "hidden",
  },
  textCont: {
    borderBottomColor: color.darkgrey,
    borderBottomWidth: 0.2,
  },
  text: {
    color: color.darkgrey,
    padding: fontSizes.md,
    fontSize: fontSizes.sm,
    textTransform: "uppercase",
    // fontWeight: "bold",
  },
  textSubCont: {
    borderTopColor: color.grey,
    borderTopWidth: 0.5,
    width: 180,
    marginLeft: 50,
  },
  subText: {
    color: color.darkgrey,
    padding: fontSizes.md,
    paddingLeft: 0,
    fontSize: fontSizes.xs,
    textTransform: "uppercase",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#171717",
  },
});
