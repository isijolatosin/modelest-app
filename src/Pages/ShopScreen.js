import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import React from "react";
import { color } from "../constants/colors";
import Layout from "../Shared/Layout";
import { Searchbar } from "react-native-paper";

const ShopScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Layout navigation={navigation}>
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
      </Layout>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.offWhite,
    // StatusBar.currentHeight only works for android
    paddingTop: StatusBar.currentHeight + 10,
  },
  backWrapper: {},
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
    shadowColor: "#171717",
  },
  searchBar: {
    backgroundColor: "transparent",
    marginTop: 5,
    elevation: 0,
  },
});
