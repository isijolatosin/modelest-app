import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import { color } from "../constants/colors";
import { Searchbar } from "react-native-paper";

const Navigation = ({
  setShowBar,
  showBar,
  showSearch,
  setSearchQuery,
  isShop,
}) => {
  const [query, setQuery] = React.useState("");

  function sendQuery() {
    setSearchQuery(query);
    setQuery("");
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setQuery}
            value={query}
            onIconPress={sendQuery}
            iconColor={color.gold}
            loading={true}
            style={styles.searchBar}
          />
        </View>
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
    height: 50,
    padding: 8,
    paddingBottom: 20,
    marginBottom: -10,
  },
  back: {
    paddingHorizontal: 4,
  },
  menu: {
    paddingRight: 10,
    paddingLeft: 20,
  },
  searchBar: {
    // width: width - 130,
    backgroundColor: "transparent",
    elevation: 0,
  },
});
