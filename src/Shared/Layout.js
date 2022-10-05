import { StyleSheet, View, Dimensions, Platform } from "react-native";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { color } from "../constants/colors";
import { variables } from "../constants/variables";
const { height, width } = Dimensions.get("window");

const Layout = ({ children, setShowBar, showBar, navigation }) => {
  return (
    <View style={styles.container}>
      <Navigation
        navigation={navigation}
        setShowBar={setShowBar}
        showBar={showBar}
      />
      <View style={styles.children}>{children}</View>
      <Footer style={styles.footer} />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: { fbackgroundColor: color.offWhite, flex: 1 },
  children: {
    height: Platform.OS === variables.isAndroid ? height - 100 : height - 150,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 150,
  },
});