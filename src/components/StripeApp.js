import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { color } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { CredentialsContext } from "./CredentialsContext";
import { fontSizes } from "../constants/fonts";
import MessageBox from "../Shared/MessageBox";
import { variables } from "../constants/variables";
import axios from "axios";
import Button from "../Shared/Button";
import { useDispatch } from "react-redux";
import {
  clearOrderPayload,
  clearCartItem,
  clearOrderStatus,
} from "../slices/appSlices";

const StripeApp = ({ total, orderPayload, navigation }) => {
  const [cardDetails, setCardDetails] = React.useState();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();
  const { storedCredentials } = React.useContext(CredentialsContext);
  const { confirmPayment, loading } = useConfirmPayment();
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [hidePay, setHidePay] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    setIsSubmitting(true);
    if (!cardDetails?.complete || !storedCredentials?.email) {
      handleMessage("Please enter complete card details", "FAILED");
      setIsSubmitting(false);
      return;
    }
    const billingDetails = {
      email: storedCredentials?.email || email,
    };
    try {
      const clientSecret = await fetchpaymentIntentClientSecret();
      if (clientSecret) {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          handleMessage(
            `Payment Confirmation Error ${error.message}`,
            "FAILED"
          );
          setIsSubmitting(false);
        } else if (paymentIntent) {
          console.log(loading);
          handleMessage("Payment Successful", "SUCCESS");
          console.log("Payment Successful", paymentIntent);
          setIsSubmitting(false);

          try {
            if (paymentIntent?.status === "Succeeded") {
              const _status = {
                orderItems: orderPayload.orderItems,
                status: "fulfilled",
              };
              await axios
                .patch(
                  `${variables.REACT_APP_NGROK_URL}/api/v1/orders/${orderPayload.id}`,
                  _status
                )
                .then((response) => {
                  const { status } = response;

                  if (status === 200) {
                    setHidePay(true);
                    setTimeout(() => {
                      handleMessage(
                        "Order Fulfilled!\nThank you for your purchase. An email including your transaction details will be sent shortly.\n\n\nRedirecting...",
                        "SUCCESS"
                      );
                      setIsSubmitting(false);
                    }, 3000);
                    setTimeout(() => {}, 5000);
                    setTimeout(() => {
                      dispatch(clearOrderPayload());
                      dispatch(clearOrderStatus());
                      dispatch(clearCartItem());
                      navigation.navigate("Shop-Screen");
                    }, 7000);
                  }
                });
            }
          } catch (errr) {
            console.log(errr.message);
            setIsSubmitting(false);
          }
        }
      }
    } catch (error) {
      handleMessage(
        "Unauthorized. Please contact Modelest Management",
        "FAILED"
      );
      setIsSubmitting(false);
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
        placeholders={{ number: "4242 4242 4242 4242" }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetail) => setCardDetails(cardDetail)}
      />

      <TouchableOpacity onPress={!hidePay && handlePay}>
        <Button
          title={
            isSubmitting ? (
              <ActivityIndicator color={color?.torquoise} />
            ) : (
              "Pay"
            )
          }
          bgclr={color.chocolate}
          clr={color.white}
          rounded={5}
          width="100%"
          size={fontSizes.sm}
          heightNo={40}
        />
      </TouchableOpacity>
      <MessageBox children={message} type={messageType} />
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.grey,
    borderColor: color.white,
    color: color.white,
    borderRadius: 5,
    borderWidth: 1,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
