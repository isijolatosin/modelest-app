import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { color } from "../constants/colors";
import { Searchbar } from "react-native-paper";

const Navigation = ({
  setShowBar,
  showBar,
  showSearch,
  navigation,
  searchQuery,
  setSearchQuery,
  isShop,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagewrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
      {showSearch && isShop && (
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onIconPress={() => {}}
            iconColor={color.black}
            loading={true}
            style={styles.searchBar}
          />
        </View>
      )}
      {isShop && (
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
      )}
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
    height: 50,
    padding: 8,
    marginBottom: -10,
  },
  back: {
    paddingHorizontal: 4,
  },
  menu: {
    paddingHorizontal: 10,
  },
  searchBar: {
    width: width - 130,
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderBottomColor: color.lightgrey,
    elevation: 0,
  },
});
