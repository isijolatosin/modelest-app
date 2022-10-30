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
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";
import Button from "../Shared/Button";
import Heading from "../Shared/Heading";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const inputAccessoryViewID = "uniqueID";
  const [text, setText] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(true);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
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
            placeholder={"User name…"}
          />
          <TextInput
            style={styles.input}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            placeholder={"First name…"}
          />
          <TextInput
            style={styles.input}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            placeholder={"Last name…"}
          />
          <TextInput
            style={styles.input}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
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
              title="Create"
              bgclr={color.chocolate}
              clr={color.white}
              rounded={30}
              width={width - 50}
              size={fontSizes.sm}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.textWrap}
          >
            <Text style={styles.text}>
              Back to{" "}
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
    marginVertical: 20,
  },
  text: {
    color: color.coffee,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
});
