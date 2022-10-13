import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import React from "react";
import { color } from "../constants/colors";
import Layout from "../Shared/Layout";
import SideBar from "../components/SideBar";
import axios from "axios";
import AllProducts from "../components/AllProducts";

const ShopScreen = ({ navigation, route }) => {
  const [showBar, setShowBar] = React.useState(false);
  const [allProduct, setAllProduct] = React.useState([]);
  const isShop = true;

  async function fetchProducts() {
    try {
      const {
        data: { productSelect },
      } = await axios.get(
        `${process.env.REACT_APP_CRACK_URL}/api/v1/products/filter`
      );
      setAllProduct(productSelect);
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Layout
        route={route}
        navigation={navigation}
        setShowBar={setShowBar}
        showBar={showBar}
        isShop={isShop}
      >
        <View>
          <AllProducts products={allProduct} navigation={navigation} />
        </View>
        {showBar && <SideBar sytle={styles.shadowProp} />}
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
