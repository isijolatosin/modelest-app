/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { color } from "../constants/colors";
// import { variables } from "../constants/variables";
import {
  clearCartItem,
  selectCartItems,
  selectItemCount,
  selectOrderPayload,
  selectOrderStatus,
  selectTotal,
  setOrderPayload,
  setOrderStatus,
} from "../slices/appSlices";
import CartproductComponent from "../components/CartproductComponent";
import { fontSizes } from "../constants/fonts";
import { variables } from "../constants/variables";
import { CredentialsContext } from "../components/CredentialsContext";
import Heading from "../Shared/Heading";
import Button from "../Shared/Button";
import MessageBox from "../Shared/MessageBox";
import MessageBox2 from "../Shared/MessageBox2";

const { width } = Dimensions.get("window");

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const inputAccessoryViewID = "uniqueID";
  const [zip, setZip] = React.useState("");
  const [city, setCity] = React.useState("");
  const cartTotal = useSelector(selectTotal);
  const [state, setState] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectItemCount);
  const orderStatus = useSelector(selectOrderStatus);
  const [message, setMessage] = React.useState();
  const [focus, setFocus] = React.useState(false);
  const [proceed, setProceed] = React.useState(false);
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [messageType, setMessageType] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { storedCredentials } = React.useContext(CredentialsContext);
  const [isChangeAddress, setIsChangeAddress] = React.useState(false);
  const orderPayload = useSelector(selectOrderPayload);

  const _clearCartItem = () => {
    dispatch(clearCartItem());
  };

  const createOrderAPI = async () => {
    if (proceed || storedCredentials) {
      const _orderItems = cartItems.map((item) => {
        const obj = { quantity: item?.quantity, id: item.id };
        return obj;
      });
      try {
        const orderItems = {
          shippingAddress1: address1 || storedCredentials?.street,
          shippingAddress2: address2 || storedCredentials?.street,
          phone: phone || storedCredentials?.phonenumber,
          status: "pending",
          user: email || storedCredentials?._id,
          city: city || storedCredentials?.city,
          zip: zip || storedCredentials?.zip,
          state: state || storedCredentials?.state,
          country: country || storedCredentials?.country,
          orderItems: _orderItems,
        };
        await axios
          .post(`${variables.REACT_APP_NGROK_URL}/api/v1/orders/`, orderItems)
          .then((res) => {
            setEmail("");
            setAddress1("");
            setAddress2("");
            setPhone("");
            setZip("");
            setCity("");
            setState("");
            setCountry("");

            const msg = res.data.message;
            const status = res.data.success && "SUCCESS";

            handleMessage(msg, status);
            if (res.data.success) {
              const orderStatusObj = {
                userId: storedCredentials?._id,
                status: res.data.success,
              };
              dispatch(setOrderStatus(orderStatusObj)); // success is a boolean
              dispatch(setOrderPayload(res.data.order)); //order is an object
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      handleMessage("Please fill the appropriate fields", "FAILED");
    }
  };
  const handleMessage = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };
  const handleSubmitInfo = () => {
    if (address1 && phone && zip && city && state && country) {
      setMessage("");
      setMessageType("");
      if (proceed) {
        setProceed(false);
      }
      setIsSubmitting(true);
      setTimeout(() => {
        handleMessage("Shipping details submitted", "SUCCESS");
        setIsSubmitting(false);
        setProceed(true);
      }, 3000);
    } else {
      handleMessage("Please fill the appropriate fields", "FAILED");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {cartItems.length ? (
          <View>
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
            <CartproductComponent
              products={cartItems}
              navigation={navigation}
            />
            {storedCredentials ? (
              <View>
                <View
                  style={{
                    backgroundColor: color.blackTrans,
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 3,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: color.white }}>
                    The following address will be use for your transaction. To
                    change the address, please provide your new information
                    using the form below
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: color.gold }}>Address:</Text>
                    <Text style={{ color: color.white }}>
                      {`${storedCredentials.street}, ${storedCredentials.city} ${storedCredentials.state}. ${storedCredentials.country} ${storedCredentials.zip}.`}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: 10, marginBottom: 10 }}
                  onPress={() => setIsChangeAddress(!isChangeAddress)}
                >
                  <Text style={{ color: color.blue }}>
                    {isChangeAddress
                      ? "Hide Change Address Form"
                      : "Show Change Address Form"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    backgroundColor: color.blackTrans,
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 3,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: color.white }}>
                    Please provide shipping information for your transaction
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: 10, marginBottom: 10 }}
                  onPress={() => setIsChangeAddress(!isChangeAddress)}
                >
                  <Text style={{ color: color.blue }}>
                    {isChangeAddress
                      ? "Hide Address Form"
                      : "Show Address Form"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {isChangeAddress && (
              <View style={{ marginHorizontal: 10 }}>
                <View>
                  <Heading children="Shipping Information" />
                  <View style={{ position: "relative" }}>
                    <TextInput
                      setFocus={focus}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                      keyboardType="email-address"
                      enablesReturnKeyAutomatically={true}
                      style={[
                        styles.input,
                        messageType === "FAILED" && { borderColor: color.red },
                      ]}
                      inputAccessoryViewID={inputAccessoryViewID}
                      onChangeText={setEmail}
                      value={email}
                      placeholder={"Email…"}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: fontSizes.md,
                        color: color.red,
                        top: 0,
                        right: 10,
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <View style={styles.inputGroup}>
                    <View
                      style={[
                        styles.inputInner,
                        { position: "relative" },
                        messageType === "FAILED" &&
                          !address1 && { borderColor: color.red },
                      ]}
                    >
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="default"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setAddress1}
                        value={address1}
                        placeholder={"Shipping Address 1…"}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: fontSizes.md,
                          color: color.red,
                          top: 0,
                          right: 10,
                        }}
                      >
                        *
                      </Text>
                    </View>
                    <View style={[styles.inputInner, { position: "relative" }]}>
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="default"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setAddress2}
                        value={address2}
                        placeholder={"Shipping Address 2…"}
                      />
                    </View>
                  </View>
                  <View style={styles.inputGroup}>
                    <View
                      style={[
                        styles.inputInner,
                        { position: "relative" },
                        messageType === "FAILED" &&
                          !phone && { borderColor: color.red },
                      ]}
                    >
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="numeric"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder={"Phone no…"}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: fontSizes.md,
                          color: color.red,
                          top: 0,
                          right: 10,
                        }}
                      >
                        *
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputInner,
                        { position: "relative" },
                        messageType === "FAILED" &&
                          !phone && { borderColor: color.red },
                      ]}
                    >
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="default"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setZip}
                        value={zip}
                        placeholder={"Zip Code…"}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: fontSizes.md,
                          color: color.red,
                          top: 0,
                          right: 10,
                        }}
                      >
                        *
                      </Text>
                    </View>
                  </View>
                  <View style={styles.inputGroup}>
                    <View
                      style={[
                        styles.inputInner,
                        { position: "relative" },
                        messageType === "FAILED" &&
                          !phone && { borderColor: color.red },
                      ]}
                    >
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="default"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setCity}
                        value={city}
                        placeholder={"City..."}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: fontSizes.md,
                          color: color.red,
                          top: 0,
                          right: 10,
                        }}
                      >
                        *
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputInner,
                        { position: "relative" },
                        messageType === "FAILED" &&
                          !phone && { borderColor: color.red },
                      ]}
                    >
                      <TextInput
                        setFocus={focus}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        keyboardType="default"
                        enablesReturnKeyAutomatically={true}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setState}
                        value={state}
                        placeholder={"State/Province…"}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: fontSizes.md,
                          color: color.red,
                          top: 0,
                          right: 10,
                        }}
                      >
                        *
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.input,
                      { position: "relative" },
                      messageType === "FAILED" &&
                        !phone && { borderColor: color.red },
                    ]}
                  >
                    <TextInput
                      setFocus={focus}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                      keyboardType="default"
                      enablesReturnKeyAutomatically={true}
                      inputAccessoryViewID={inputAccessoryViewID}
                      onChangeText={setCountry}
                      value={country}
                      placeholder={"Country..."}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: fontSizes.md,
                        color: color.red,
                        top: 0,
                        right: 10,
                      }}
                    >
                      *
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmitInfo}
                    style={{ alignItems: "center", marginTop: 10 }}
                  >
                    <Button
                      title={
                        isSubmitting ? (
                          <ActivityIndicator color={color?.torquoise} />
                        ) : (
                          "Submit"
                        )
                      }
                      bgclr={color.lightgrey}
                      clr={color.black}
                      width={width - 28}
                      rounded={3}
                      size={fontSizes.sm}
                    />
                  </TouchableOpacity>
                  <MessageBox children={message} type={messageType} />
                </View>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: width,
                backgroundColor: color.chocolate,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: "bold",
                  color: color.green,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontWeight: "300", color: color.white }}>
                  No of Item -{" "}
                </Text>
                {itemCount} {itemCount <= 1 ? "item" : "items"}
              </Text>
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: "bold",
                  color: color.green,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontWeight: "300", color: color.white }}>
                  Total -{" "}
                </Text>
                US${cartTotal}
              </Text>
            </View>
            {orderStatus?.userId === storedCredentials?._id ? (
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Payment-Screen");
                  }}
                  style={styles.ProceedBtn}
                >
                  <MaterialIcons
                    name="next-plan"
                    size={15}
                    color={color.white}
                    style={styles.back}
                  />
                  <Text
                    style={{
                      color: color.white,
                      marginLeft: 5,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    Proceed to Payment
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={createOrderAPI}
                  style={[styles.clearBtn]}
                >
                  <Fontisto
                    name="opencart"
                    size={10}
                    color={color.white}
                    style={styles.back}
                  />
                  <Text
                    style={{
                      color: color.white,
                      marginLeft: 5,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    Place Order
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_clearCartItem}
                  style={[styles.clearBtn]}
                >
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={15}
                    color={color.white}
                    style={styles.back}
                  />
                  <Text
                    style={{
                      color: color.white,
                      marginLeft: 5,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    Clear cart
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <MessageBox2 children={message} type={messageType} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginVertical: 20,
              backgroundColor: color.gold,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: fontSizes.sm }}>Cart is Empty...</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.clearBtn]}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={10}
                color={color.white}
                style={styles.back}
              />
              <Text
                style={{
                  color: color.white,
                  marginLeft: 5,
                  fontSize: fontSizes.sm,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    // StatusBar.currentHeight only works for android
    paddingTop:
      StatusBar.currentHeight + Platform.OS === variables.isAndroid ? 20 : 50,
  },
  backWrapper: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    top: 10,
    left: 20,
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  clearBtn: {
    backgroundColor: color.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    width: width / 3,
  },
  ProceedBtn: {
    backgroundColor: color.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    width: width / 3,
  },
  input: {
    borderWidth: 0.5,
    width: width - 20,
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 15,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputInner: {
    flex: 0.49,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 15,
  },
});
