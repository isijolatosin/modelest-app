import React from "react";
import {
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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
// import * as GoogleSignIn from "expo-google-sign-in";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import Button from "../Shared/Button";
import Heading from "../Shared/Heading";
import MessageBox from "../Shared/MessageBox";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [focus, setFocus] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [secure, setSecure] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState();
  const { setStoredCredentials } = React.useContext(CredentialsContext);
  const [messageType, setMessageType] = React.useState();

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

  // initialize google sign in
  // React.useEffect(() => {
  //   initAsync();
  // });

  // const androidClientId =
  //   "572989125998-kh57n34vs5onf6fno7iqo69kjk4gmil7.apps.googleusercontent.com";
  // const iosClientId =
  //   "572989125998-q0shhooc8f1radf8o2ghe9gd5r4cj2es.apps.googleusercontent.com";

  // const initAsync = async () => {
  //   try {
  //     await GoogleSignIn.initAsync({
  //       clientId: Platform.OS === "ios" ? iosClientId : androidClientId,
  //     });
  //   } catch (error) {}
  // };

  // const getUserDetails = async () => {
  //   const user = await GoogleSignIn.signInSilientlyAsync();
  //   user && persistLogin({ ...user }, "Google signin successful", "success");
  // };

  // const handleGoogleSignIn = () => {};

  const callSignInApi = async () => {
    if (email && password) {
      if (setMessage !== "") {
        setMessage("");
      }
      const authUser = {
        email: email.toLocaleLowerCase(),
        passwordHash: password,
      };
      try {
        setIsSubmitting(true);
        const {
          data: { msg, user, token },
        } = await axios.post(
          `${process.env.REACT_APP_NGROK_URL}${process.env.REACT_APP_BASE_URL}/users/login`,
          authUser
        );
        if (token) {
          const type = "SUCCESS";
          setTimeout(() => {
            handleMessage(msg, type);
            setIsSubmitting(false);
            setEmail("");
            setPassword("");
          }, 3000);
          setTimeout(() => {
            persistLogin(user, msg, type);
          }, 5000);
        } else {
          const type = "FAILED";
          handleMessage(msg, type);
        }
      } catch (error) {
        const _message =
          "An error occur! Check your network / credentials and try again";
        handleMessage(_message);
        setIsSubmitting(false);
      }
    } else {
      const _message = "Please fill in the required fields!";
      handleMessage(_message);
    }
  };

  const handleMessage = (msg, type = "FAILED") => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={{ marginBottom: 20 }}>
            <Heading children="Login" />
          </View>
          <TextInput
            name="email"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            setFocus={focus}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={"Email…"}
          />
          <View style={[styles.password]}>
            <TextInput
              value={password}
              name="passwordHash"
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
          </View>
          <MessageBox children={message} type={messageType} />
          <TouchableOpacity onPress={callSignInApi}>
            <Button
              title={
                isSubmitting ? (
                  <ActivityIndicator color={color?.torquoise} />
                ) : (
                  "Access"
                )
              }
              bgclr={color.chocolate}
              clr={color.white}
              rounded={5}
              width={width - 50}
              size={fontSizes.sm}
            />
          </TouchableOpacity>

          <View style={styles.textWrap}>
            <Text style={styles.text}>
              Don't have an account? Create now for{" "}
              <Text style={{ color: color.torquoise }}>
                better experience{" "}
                <Text style={{ fontSize: fontSizes.lg }}>&#128512;</Text>
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register-Screen")}
            >
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  borderWidth: 0.5,
                  borderColor: color.lightgray,
                  textAlign: "center",
                  paddingVertical: 7,
                  borderRadius: 5,
                  marginTop: 10,
                  color: color.torquoise,
                }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 15,
                borderColor: color.lightgray,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.textWrap,
                  {
                    marginRight: 10,
                    borderRightWidth: 0.5,
                    paddingRight: 10,
                    borderColor: color.torquoise,
                  },
                ]}
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={[
                    styles.text,
                    { fontSize: fontSizes.sm, color: color.torquoise },
                  ]}
                >
                  Back to Shop
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textWrap}
                onPress={() => navigation.navigate("Home-Screen")}
              >
                <Text
                  style={[
                    styles.text,
                    { fontSize: fontSizes.sm, color: color.torquoise },
                  ]}
                >
                  Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  input: {
    borderWidth: 0.5,
    width: width - 50,
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 15,
  },
  password: {
    borderWidth: 0.5,
    width: width - 50,
    borderRadius: 5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textWrap: {
    marginVertical: 10,
  },
  text: {
    color: color.coffee,
    fontSize: fontSizes.xs,
    textAlign: "center",
  },
});
