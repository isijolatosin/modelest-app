/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { color } from "../constants/colors";
import { selectOrderPayload } from "../slices/appSlices";
import PaymentProductComponent from "../components/PaymentProductComponent";
import { fontSizes } from "../constants/fonts";
import { variables } from "../constants/variables";
import Heading from "../Shared/Heading";
import StripeApp from "../components/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

const PaymentScreen = ({ navigation }) => {
  const orderPayload = useSelector(selectOrderPayload);
  const [customerDetails, setCustomerDetails] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);

  async function fetchOrder() {
    try {
      const {
        data: { response },
      } = await axios.get(
        `${variables.REACT_APP_NGROK_URL}/api/v1/orders/${orderPayload.id}`
      );
      const _customerDetails = {
        id: response.id || response._id,
        city: response.city,
        country: response.country,
        shippingAddress1: response.shippingAddres21,
        shippingAddress2: response.shippingAddress2,
        phone: response.phone,
        state: response.state,
        user: response.user,
        zip: response.zip,
      };
      const _orderDetails = {
        details: response.orderItems,
        totalPrice: response.totalPrice,
        status: response.status,
        dateOrdered: response.dateOrdered,
      };

      setOrderDetails(_orderDetails);
      setCustomerDetails([_customerDetails]);
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.darkgrey} />
      {customerDetails.map((order) => (
        <View key={order?.id}>
          <View style={{ backgroundColor: color.lightgrey, padding: 20 }}>
            <Heading children="Customer" />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: fontSizes.sm, color: color.darkgrey }}
              >{`${order?.user?.lastname}, ${order?.user?.firstname}`}</Text>
              <Text style={{ marginLeft: 10 }}>{order?.phone}</Text>
            </View>
            <Text style={{ fontSize: fontSizes.sm, color: color.darkgrey }}>
              {order?.user?.email}
            </Text>
            <Text>{`${
              order?.shippingAddress1 || order?.shippingAddress2
            },`}</Text>
            <Text>{`${order?.city} ${order?.state}.`}</Text>
            <Text>{`${order?.country} ${order?.zip}`}</Text>
          </View>
        </View>
      ))}
      <View
        style={{ backgroundColor: color.lightgrey, padding: 20, marginTop: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Heading
              children="Order Details"
              noBorder={true}
              noBtnMargin={true}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.6,
            }}
          >
            <Text style={{ fontWeight: "bold", color: color.lightgray }}>
              Item Number:{" "}
              {orderDetails?.details?.reduce(
                (total, prod) => total + prod?.quantity,
                0
              )}
            </Text>
            <Text style={{ fontWeight: "bold", color: color.lightgray }}>
              <Text>Total: </Text>US ${orderDetails?.totalPrice}
            </Text>
          </View>
        </View>
        <View>
          <PaymentProductComponent products={orderDetails} />
        </View>
        <StripeProvider publishableKey={variables.REACT_APP_STRIPE_PUBLIC_KEY}>
          <StripeApp
            total={orderDetails?.totalPrice}
            orderPayload={orderPayload}
            navigation={navigation}
          />
        </StripeProvider>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    // StatusBar.currentHeight only works for android
    // paddingTop: StatusBar.currentHeight + 10,
    position: "relative",
  },
  backWrapper: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
});
