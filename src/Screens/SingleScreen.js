/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../constants/colors";
import axios from "axios";
import Slideshow from "../utilities/Slideshow";
import Rating from "../Shared/Rating";
import { fontSizes } from "../constants/fonts";
import PaymentOptions from "../Shared/PaymentOptions";
import Button from "../Shared/Button";
import Heading from "../Shared/Heading";
import { description } from "../utilities/description";

const SingleScreen = ({ navigation, route }) => {
  const singleProductId =
    route.params.singleProduct.id || route.params.singleProduct._id;
  const [singleProduct, setProduct] = React.useState([]);
  const { width } = Dimensions.get("window");

  async function fetchProducts() {
    try {
      const {
        data: { product },
      } = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/api/v1/products/${singleProductId}`
      );
      setProduct(product);
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const availableSizes =
    singleProduct?.availablelength &&
    singleProduct?.availablelength.split(", ");

  const sizes = singleProduct?.length && singleProduct?.length.split(", ");

  const des = description(singleProduct, availableSizes);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {singleProduct?.images && <Slideshow product={singleProduct} />}
        </View>
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
        <View />
        <View>
          <View style={{ marginHorizontal: 15 }}>
            <Text style={styles.title}>{singleProduct?.name}</Text>
            <View style={styles.star}>
              <Text>Reviews: </Text>
              <Rating isNum={true} size={15} />
            </View>
            <Text style={styles.des}>{singleProduct?.description}</Text>
          </View>
          {availableSizes && (
            <View style={styles.sizes}>
              {availableSizes.map((size, idx) => {
                return (
                  <Text
                    key={idx}
                    style={[
                      styles.sizeItem,
                      sizes.includes(size)
                        ? {
                            borderColor: color.chocolate,
                            color: color.chocolate,
                          }
                        : { borderColor: color.grey, color: color.grey },
                    ]}
                  >
                    {size}
                  </Text>
                );
              })}
            </View>
          )}
          <View style={{ marginHorizontal: 15 }}>
            <View>
              <Text style={{ fontSize: fontSizes.lg, fontWeight: "900" }}>
                ${singleProduct?.price}.00
              </Text>
              <Text style={styles.text}>Color: {singleProduct?.color}</Text>
              <Text style={styles.text}>Texture: {singleProduct?.texture}</Text>
              <Text style={styles.text}>Length: </Text>
            </View>
            <View>
              <PaymentOptions price={singleProduct?.price} />
            </View>
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Button
              title="Add to cart"
              bgclr={color.chocolate}
              clr={color.white}
              width={width - 28}
              rounded={3}
              size={fontSizes.sm}
            />
          </View>
          <View style={styles.details}>
            <Heading children="Product Details" />
            {des.map((discrption, idx) => (
              <Text key={idx} style={styles.detailText}>
                <Text style={styles.detailTextInner}>{discrption?.key} </Text>:{" "}
                {discrption.value}
              </Text>
            ))}
          </View>
          <View style={styles.details}>
            <Heading children="Maintenance" />
            {singleProduct?.maintenance &&
              singleProduct?.maintenance.map((main, idx) => (
                <Text key={idx}>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: fontSizes.lg,
                    }}
                  >
                    &#x2022;{" "}
                  </Text>
                  {main}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // StatusBar.currentHeight only works for android
    // paddingTop: StatusBar.currentHeight + 10,
    position: "relative",
    marginBottom: 50,
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
  },
  title: { fontSize: fontSizes.lg, fontWeight: "700", marginVertical: 10 },
  des: { fontSize: fontSizes.sm, marginTop: 10 },
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
  sizes: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 20,
    marginVertical: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: color.grey,
    paddingHorizontal: 15,
  },
  sizeItem: {
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    fontStyle: "italic",
    color: color.lightgray,
  },
  details: {
    marginHorizontal: 15,
    marginTop: 20,
    borderTopWidth: 0.5,
    borderColor: color.grey,
    color: color.lightgray,
    paddingTop: 40,
  },
  detailText: {
    fontSize: fontSizes.sm,
    marginBottom: 2,
    fontStyle: "italic",
    marginVertical: 5,
  },
  detailTextInner: {
    fontWeight: "600",
    color: color.red,
  },
});
