import { StyleSheet, View, Dimensions, Platform } from "react-native";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { color } from "../constants/colors";
import { variables } from "../constants/variables";
const { height } = Dimensions.get("window");

const Layout = ({
  children,
  setShowBar,
  showBar,
  isShop,
  navigation,
  route,
  setSearchQuery,
  searchQuery,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ borderBottomColor: color.grey, borderBottomWidth: 0.5 }}>
        <Navigation
          navigation={navigation}
          showBar={showBar}
          setShowBar={setShowBar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isShop={isShop}
        />
      </View>
      <View style={styles.children}>{children}</View>
      <Footer style={styles.footer} route={route} navigation={navigation} />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: { fbackgroundColor: color.offWhite, flex: 1 },
  children: {
    height: Platform.OS === variables.isAndroid ? height - 150 : height - 200,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 150,
  },
});
