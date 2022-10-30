/* eslint-disable react-hooks/exhaustive-deps */
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AllProducts from "../components/AllProducts";
import { color } from "../constants/colors";

const VirginWigsScreen = ({ navigation, route }) => {
  const parameter = route?.params?.parameter;
  const [wigs, setWigs] = React.useState([]);

  async function fetchProducts() {
    try {
      const {
        data: { productSelect },
      } = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/api/v1/products/filter`
      );
      setWigs(
        productSelect.filter(
          (product) => product?.brand.toLowerCase() === parameter
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backWrapper]}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={30}
          color={color.white}
          style={styles.back}
        />
      </TouchableOpacity>
      <View>
        <AllProducts products={wigs} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default VirginWigsScreen;

// const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
  backWrapper: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
});
