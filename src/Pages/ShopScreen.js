import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import React from "react";
import { color } from "../constants/colors";
import Layout from "../Shared/Layout";
import SideBar from "../components/SideBar";

const ShopScreen = ({ navigation, route }) => {
  const [showBar, setShowBar] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Layout
        route={route}
        navigation={navigation}
        setShowBar={setShowBar}
        showBar={showBar}
      >
        {showBar && <SideBar sytle={styles.shadowProp} />}
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
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
    shadowColor: "#171717",
  },
});
