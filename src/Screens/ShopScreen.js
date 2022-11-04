/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import React from "react";
import { color } from "../constants/colors";
import Layout from "../Shared/Layout";
import SideBar from "../components/SideBar";
import axios from "axios";
import AllProducts from "../components/AllProducts";
import { variables } from "../constants/variables";

const ShopScreen = ({ navigation, route }) => {
  const [showBar, setShowBar] = React.useState(false);
  const [allProduct, setAllProduct] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const isShop = true;

  async function fetchProducts() {
    try {
      const {
        data: { productSelect },
      } = await axios.get(
        `${variables.REACT_APP_NGROK_URL}/api/v1/products/filter`
      );

      if (searchQuery !== "") {
        if (searchQuery.toLowerCase() === "all") {
          setAllProduct(productSelect);
        } else {
          setAllProduct(
            productSelect.filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
      } else {
        setAllProduct(productSelect);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.darkgrey} />
      <Layout
        route={route}
        navigation={navigation}
        setShowBar={setShowBar}
        showBar={showBar}
        isShop={isShop}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      >
        <View>
          <AllProducts products={allProduct} navigation={navigation} />
        </View>
        {showBar && (
          <SideBar
            sytle={styles.shadowProp}
            navigation={navigation}
            setShowBar={setShowBar}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    // StatusBar.currentHeight only works for android
    // paddingTop: StatusBar.currentHeight + 10,
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
