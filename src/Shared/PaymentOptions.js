import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { color } from "../constants/colors";
import { variables } from "../constants/variables";

const PaymentOptions = ({ price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.paymentLogo}>
        <Text>Pay with Credit / Debit Card </Text>
        <Image
          source={{ uri: variables?.REACT_APP_STRIPE_LOGO }}
          alt="stripe"
          style={styles.image}
        />
        <Text>/ </Text>
        <Image
          source={{ uri: variables?.REACT_APP_PAYPAL_LOGO }}
          alt="paypal"
          style={styles.image}
        />
      </View>
      <View style={styles.paymentLogo}>
        <Text>
          or 4 interest-free payment of ${price ? price / 4 : "$$$"} with{" "}
        </Text>
        <Image
          source={{
            uri: variables?.REACT_APP_PAYPAL_LOGO,
          }}
          alt="paypal"
          style={styles.image}
        />
      </View>
      <Text style={{ color: color.purple, fontWeight: "500" }}>
        Available @ checkout
      </Text>
    </View>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  paymentLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -15,
  },
  image: { width: 45, height: 45, resizeMode: "contain" },
});
