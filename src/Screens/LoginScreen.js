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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import Button from "../Shared/Button";
import Heading from "../Shared/Heading";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const inputAccessoryViewID = "uniqueID";
  const [text, setText] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(true);

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
            style={styles.input}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            setFocus={focus}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={"Email…"}
          />
          <View style={[styles.password]}>
            <TextInput
              inputAccessoryViewID={inputAccessoryViewID}
              value={text}
              placeholder={"Password…"}
              setFocus={focus}
              onChangeText={() => {}}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              secureTextEntry={secure} //we just added this
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
          <TouchableOpacity>
            <Button
              title="Access"
              bgclr={color.chocolate}
              clr={color.white}
              rounded={30}
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
                  borderRadius: 15,
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
    marginBottom: 20,
    borderRadius: 50,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 15,
  },
  password: {
    borderWidth: 0.5,
    width: width - 50,
    marginBottom: 20,
    borderRadius: 50,
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
