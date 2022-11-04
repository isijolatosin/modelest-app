/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
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
import { descriptionFunc } from "../utilities/description";
import { variables } from "../constants/variables";
import { TextInput } from "react-native-gesture-handler";
import MessageBox from "../Shared/MessageBox";
import { useDispatch } from "react-redux";
import {
  addToCartItem,
  increaseCartItem,
  selectCartItems,
} from "../slices/appSlices";
import { isInCart } from "../utilities/isInCart";
import { useSelector } from "react-redux";

const SingleScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const singleProductId =
    route.params.singleProduct.id || route.params.singleProduct._id;
  const [singleProduct, setProduct] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [length, setLength] = React.useState("");
  const { width } = Dimensions.get("window");
  const [focus, setFocus] = React.useState(false);
  const [noFieldErrorLength, setNoFieldErrorLength] = React.useState(false);
  const [noFieldErrorQty, setNoFieldErrorQty] = React.useState(false);
  const [qty, setQuantity] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [message, setMessage] = React.useState("");
  const cartItems = useSelector(selectCartItems);

  async function fetchProducts() {
    try {
      const {
        data: { product },
      } = await axios.get(
        `${variables.REACT_APP_NGROK_URL}/api/v1/products/${singleProductId}`
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
  const des = descriptionFunc(singleProduct, availableSizes);

  // order api
  const handleMessage = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };

  const addToCart = () => {
    if (length && qty) {
      setIsSubmitting(true);
      const quantity = +qty;
      const id = singleProduct?.id;
      const description = singleProduct?.description;
      const image = singleProduct?.images[0];
      const name = singleProduct?.name;
      const price = singleProduct?.price;

      const productObj = { id, name, description, image, price, quantity };
      setTimeout(() => {
        dispatch(addToCartItem(productObj));
        handleMessage("Product added to Cart Successfully", "SUCCESS");
        setIsSubmitting(false);
        setNoFieldErrorQty(false);
        setNoFieldErrorLength(false);
        setQuantity();
        setLength();
      }, 3000);
    } else {
      setNoFieldErrorQty(true);
      setNoFieldErrorLength(true);
      setIsSubmitting(false);
      handleMessage("Check! you may be missing a field", "FAILED");
    }
  };
  const addMoreToCart = () => {
    if (length && qty) {
      if (message) {
        setMessage();
      }
      setIsSubmitting(true);
      const quantity = +qty;
      const id = singleProduct?.id;
      const description = singleProduct?.description;
      const image = singleProduct?.images[0];
      const name = singleProduct?.name;
      const price = singleProduct?.price;

      const productObj = { id, name, description, image, price, quantity };
      setTimeout(() => {
        dispatch(increaseCartItem(productObj));
        handleMessage("Product added to Cart Successfully", "SUCCESS");
        setIsSubmitting(false);
        setNoFieldErrorQty(false);
        setNoFieldErrorLength(false);
        setQuantity();
        setLength();
      }, 3000);
    } else {
      setNoFieldErrorQty(true);
      setNoFieldErrorLength(true);
      setIsSubmitting(false);
      handleMessage("Check! you may be missing a field", "FAILED");
    }
  };

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
            <View style={styles.sizeWrapper}>
              <View style={styles.sizes}>
                {availableSizes.map((size, idx) => {
                  return (
                    <Text
                      onPress={() => setLength(size)}
                      key={idx}
                      style={[
                        styles.sizeItem,
                        sizes.includes(size)
                          ? {
                              borderColor: color.chocolate,
                              color: color.chocolate,
                            }
                          : { borderColor: color.grey, color: color.grey },
                        length === size && {
                          backgroundColor: color.chocolate,
                          color: color.white,
                        },
                        noFieldErrorLength && { borderColor: color.red },
                      ]}
                    >
                      {size}
                    </Text>
                  );
                })}
              </View>
              <TextInput
                value={qty}
                setFocus={focus}
                name="quantity"
                placeholder="quantity"
                onChangeText={setQuantity}
                keyboardType="numeric"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={{
                  borderWidth: 0.5,
                  borderColor: noFieldErrorQty ? color.red : color.chocolate,
                  paddingVertical: 10,
                  marginBottom: 15,
                  borderRadius: 5,
                  width: width / 2,
                  fontSize: fontSizes.md,
                  paddingHorizontal: 10,
                }}
              />
            </View>
          )}
          <View style={{ marginHorizontal: 15 }}>
            <View>
              <Text style={{ fontSize: fontSizes.lg, fontWeight: "900" }}>
                ${qty ? singleProduct?.price * qty : singleProduct?.price}.00
              </Text>
              <Text style={styles.text}>Color: {singleProduct?.color}</Text>
              <Text style={styles.text}>Texture: {singleProduct?.texture}</Text>
              {length && (
                <Text style={styles.text}>Length: {length}" inches </Text>
              )}
            </View>
            <View>
              <PaymentOptions price={singleProduct?.price} />
            </View>
          </View>

          {isInCart(singleProduct, cartItems) ? (
            <TouchableOpacity
              onPress={addMoreToCart}
              style={{
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Button
                title={
                  isSubmitting ? (
                    <ActivityIndicator color={color?.torquoise} />
                  ) : (
                    "Add more"
                  )
                }
                bgclr={color.chocolate}
                clr={color.white}
                width="93%"
                rounded={3}
                size={fontSizes.sm}
                heightNo={40}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={addToCart}
              style={{
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Button
                title={
                  isSubmitting ? (
                    <ActivityIndicator color={color?.torquoise} />
                  ) : (
                    "Add to Cart"
                  )
                }
                bgclr={color.chocolate}
                clr={color.white}
                width="93%"
                rounded={3}
                size={fontSizes.sm}
                heightNo={40}
              />
            </TouchableOpacity>
          )}

          <MessageBox children={message} type={messageType} />
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
    top: 40,
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
  sizeWrapper: {
    paddingHorizontal: 15,
  },
  sizes: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 20,
    marginVertical: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: color.grey,
  },
  sizeItem: {
    borderWidth: 0.5,
    borderRadius: Platform.OS === variables.isIOS ? 0 : 30,
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
