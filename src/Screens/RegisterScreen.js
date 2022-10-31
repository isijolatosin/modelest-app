import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import { variables } from "../constants/variables";
import Button from "../Shared/Button";
import Heading from "../Shared/Heading";
import MessageBox from "../Shared/MessageBox";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const inputAccessoryViewID = "uniqueID";
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(true);
  const [secure2, setSecure2] = React.useState(true);
  const [zip, setZip] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [appartment, setAppartment] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { setStoredCredentials } = React.useContext(CredentialsContext);

  const callRegisterApi = async () => {
    if (password !== confirmPassword) {
      handleMessage("Passwords does not match");
      setIsSubmitting(false);
    } else {
      if (email && password && firstname && lastname && username) {
        if (setMessage !== "") {
          setMessage("");
        }
        const registerUser = {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email.toLowerCase(),
          passwordHash: password,
          phonenumber: phonenumber,
          zip: zip,
          street: street,
          appartment: appartment,
          city: city,
          state: state,
          country: country,
        };
        try {
          setIsSubmitting(true);
          const {
            data: { user, success, msg },
          } = await axios.post(
            `${process.env.REACT_APP_NGROK_URL}${process.env.REACT_APP_BASE_URL}/users/register`,
            registerUser
          );

          if (success) {
            setTimeout(() => {
              handleMessage(msg, success);
              setIsSubmitting(false);
              setZip("");
              setCity("");
              setEmail("");
              setState("");
              setStreet("");
              setCountry("");
              setPassword("");
              setUsername("");
              setLastname("");
              setFirstname("");
              setAppartment("");
              setPhonenumber("");
              setConfirmPassword("");
            }, 3000);
            setTimeout(() => {
              persistLogin(user, msg, success);
            }, 5000);
          } else {
            const type = "FAILED";
            const _msg = "Please verify your credentials and try again";
            handleMessage(_msg, type);
          }
        } catch (error) {
          const _message = "An error occur! Contact your administrator";
          handleMessage(_message);
          setIsSubmitting(false);
        }
      } else {
        const _message = "Please fill in the required fields!";
        handleMessage(_message);
      }
    }
  };

  const persistLogin = (credentials, messg, status) => {
    AsyncStorage.setItem("modelestCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(messg, status);
        setStoredCredentials(credentials);
      })
      .catch((err) => {
        console.log(err);
        handleMessage("Persisting Login Failed");
      });
  };

  const handleMessage = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Avatar.Image
              style={styles.avatarImage}
              size={35}
              source={{
                uri: variables?.REACT_APP_LOGO,
              }}
            />
            <Heading children="Account Login" />
          </View>

          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
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
            <View style={[styles.password, styles.inputInner]}>
              <TextInput
                inputAccessoryViewID={inputAccessoryViewID}
                value={password}
                placeholder={"Password…"}
                setFocus={focus}
                onChangeText={setPassword}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                secureTextEntry={secure} //we just added this
                style={{ flex: 0.8 }}
              />
              <TouchableOpacity>
                <Ionicons
                  name={secure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={secure ? color.grey : color.lightgray}
                  onPress={() => setSecure(!secure)}
                />
              </TouchableOpacity>
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
            <View style={[styles.password, styles.inputInner]}>
              <TextInput
                inputAccessoryViewID={inputAccessoryViewID}
                value={confirmPassword}
                placeholder={"Confirm password…"}
                setFocus={focus}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                secureTextEntry={secure2} //we just added this
                style={{ flex: 0.8 }}
              />
              <TouchableOpacity>
                <Ionicons
                  name={secure2 ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={secure2 ? color.grey : color.lightgray}
                  onPress={() => setSecure2(!secure2)}
                />
              </TouchableOpacity>
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
            <View style={[styles.inputInner, { position: "relative" }]}>
              <TextInput
                inputAccessoryViewID={inputAccessoryViewID}
                onChangeText={setFirstname}
                value={firstname}
                placeholder={"First name…"}
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
                inputAccessoryViewID={inputAccessoryViewID}
                onChangeText={setLastname}
                value={lastname}
                placeholder={"Last name…"}
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
            <View style={[styles.inputInner, { position: "relative" }]}>
              <TextInput
                inputAccessoryViewID={inputAccessoryViewID}
                onChangeText={setUsername}
                value={username}
                placeholder={"User name…"}
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
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setPhonenumber}
              value={phonenumber}
              placeholder={"Phone…"}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setZip}
              value={zip}
              placeholder={"Zip Code…"}
            />
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setStreet}
              value={street}
              placeholder={"Street…"}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setAppartment}
              value={appartment}
              placeholder={"Appartment…"}
            />
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setCity}
              value={city}
              placeholder={"City..."}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setState}
              value={state}
              placeholder={"State/Province…"}
            />
            <TextInput
              style={styles.inputInner}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setCountry}
              value={country}
              placeholder={"Country..."}
            />
          </View>
          <MessageBox children={message} type={messageType} />
          <TouchableOpacity onPress={callRegisterApi}>
            <Button
              title={
                isSubmitting ? (
                  <ActivityIndicator color={color?.torquoise} />
                ) : (
                  "Create"
                )
              }
              bgclr={color.chocolate}
              clr={color.white}
              rounded={5}
              width={width - 50}
              size={fontSizes.sm}
              style={{ flex: 0.2 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.textWrap}
          >
            <Text style={styles.text}>
              Already have n account?{" "}
              <Text style={{ color: color.torquoise }}>
                Login <Text style={{ fontSize: fontSizes.lg }} />
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  backWrapper: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 50,
  },
  avatarImage: {
    backgroundColor: color.black,
    marginRight: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    width: width - 50,
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
  password: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textWrap: {
    marginVertical: 20,
  },
  text: {
    color: color.coffee,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
});
