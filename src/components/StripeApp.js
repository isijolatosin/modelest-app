import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { color } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { CredentialsContext } from "./CredentialsContext";
import { fontSizes } from "../constants/fonts";
import MessageBox from "../Shared/MessageBox";
import { variables } from "../constants/variables";
import axios from "axios";

const StripeApp = ({ total }) => {
  const [cardDetails, setCardDetails] = React.useState();
  const [email, setEmail] = React.useState();
  const { storedCredentials } = React.useContext(CredentialsContext);
  const { confirmPayment, loading } = useConfirmPayment();
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();

  const fetchpaymentIntentClientSecret = async () => {
    const price = { price: total };
    let clientSecret;
    await axios
      .post(`${variables.REACT_APP_NGROK_URL}/create-payment-intent`, price)
      .then((res) => (clientSecret = res.data.clientSecret))
      .catch((err) =>
        handleMessage(`Payment Failed: ${err.message}`, "FAILED")
      );
    return clientSecret;
    // const { clientSecret, errorMsg } = await response.json();
    // return { clientSecret, errorMsg };
  };

  const handlePay = async () => {
    if (!cardDetails?.complete || !storedCredentials?.email) {
      handleMessage("Please enter complete card details", "FAILED");
      return;
    }
    const billingDetails = {
      email: storedCredentials?.email || email,
    };
    try {
      const clientSecret = await fetchpaymentIntentClientSecret();
      if (clientSecret) {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          handleMessage(
            `Payment Confirmation Error ${error.message}`,
            "FAILED"
          );
        } else if (paymentIntent) {
          handleMessage("Payment Successful", "SUCCESS");
          console.log("Payment Successful", paymentIntent);
        }
      }
    } catch (error) {
      handleMessage(
        "Unauthorized. Please contact Modelest Management",
        "FAILED"
      );
    }
  };

  const handleMessage = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <View>
      {!storedCredentials && (
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
        />
      )}
      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: "**** **** **** ****" }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetail) => setCardDetails(cardDetail)}
      />
      <Button
        onPress={handlePay}
        style={{
          color: color.white,
          textAlign: "center",
          fontSize: fontSizes.md,
        }}
        disabled={loading}
        //   icon="camera"
        buttonColor={color.chocolate}
        mode="contained"
        loading={loading}
        dark
      >
        Pay
      </Button>
      <MessageBox children={message} type={messageType} />
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  card: { backgroundColor: color.white },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
