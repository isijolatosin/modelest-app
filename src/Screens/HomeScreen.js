import React from "react";
import axios from "axios";
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  useFonts as useInter,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  useFonts as useArizonia,
  Arizonia_400Regular,
} from "@expo-google-fonts/arizonia";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Switch } from "react-native-switch";
import "expo/AppEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import { color } from "../constants/colors";
import { REACT_APP_CLOUDINARY_WIGS } from "@env";
import PictureSlide from "../components/PictureSlide";
import { fonts, fontSizes } from "../constants/fonts";
import Button from "../Shared/Button";
import { Avatar } from "react-native-paper";
import { variables } from "../constants/variables";

const { height, width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [allWigsCloudinaryImg, setAllWigsCloudinaryImg] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);

  React.useEffect(() => {
    if (storedCredentials) {
      setIsEnabled(true);
    }
  }, [storedCredentials]);

  const clearLogin = () => {
    AsyncStorage.removeItem("modelestCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  const fetchCloudinaryImages = async () => {
    const {
      data: { resources },
    } = await axios.get(REACT_APP_CLOUDINARY_WIGS);

    const images = [];
    resources.map((img) => {
      const public_id = img?.public_id;
      let version = img?.version;
      let format = img?.format;

      images.push(
        `${variables?.REACT_APP_CLOUDINARY_BASEURL}${version}/${public_id}.${format}`
      );
    });

    setAllWigsCloudinaryImg(images);
  };

  React.useEffect(() => {
    fetchCloudinaryImages();
  }, []);

  const [interLoaded] = useInter({
    Inter_400Regular,
  });
  const [arizoniaLoaded] = useArizonia({
    Arizonia_400Regular,
  });
  if (!interLoaded || !arizoniaLoaded) {
    return null;
  }
  const handleStatus = () => {
    if (storedCredentials) {
      clearLogin();
      setIsEnabled(false);
    }
    if (!isEnabled) {
      setIsEnabled(true);
      setTimeout(() => {
        navigation.navigate("Login-Screen");
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <PictureSlide images={allWigsCloudinaryImg} />
      <Avatar.Image
        style={styles.avatarImage}
        size={65}
        source={{
          uri: variables?.REACT_APP_LOGO,
        }}
      />
      {storedCredentials?.firstname && storedCredentials?.lastname && (
        <Avatar.Text
          style={styles.avatarText}
          size={30}
          label={`${storedCredentials?.firstname?.charAt(
            0
          )}.${storedCredentials?.lastname?.charAt(0)}`}
        />
      )}
      <View style={styles.btnWrapper}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 5 }}>
            <Switch
              value={isEnabled}
              onValueChange={handleStatus}
              disabled={false}
              activeText={"Logout"}
              inActiveText={"Login"}
              circleSize={10}
              barHeight={40}
              circleBorderWidth={0}
              backgroundActive={color.black}
              backgroundInactive={color.black}
              circleActiveColor={color.green}
              circleInActiveColor={color.gold}
              //renderInsideCircle={() => <Text>Login</Text>} // custom component to render inside the Switch circle (Text, Image, etc.)
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 35,
                },
                isEnabled ? { marginLeft: 15 } : { marginRight: 20 },
              ]} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={isEnabled ? { width: 140 } : { width: 130 }} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={13.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={5} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Shop-Screen")}>
            <Button
              style={styles.btn}
              title="Shop"
              size={18}
              clr={color.gold}
              bgclr={color.black}
              width={width / 3}
              rounded={5}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.motto}>
          <Text style={styles.mottoText}>Your please, our luxury...</Text>
        </View>
      </View>

      {/* <ExpoStatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    position: "relative",
    // StatusBar.currentHeight only works for android
    // marginTop: StatusBar.currentHeight + 10,
  },
  avatarImage: {
    position: "absolute",
    backgroundColor: color.black,
    top: 40,
    right: 20,
  },
  avatarText: {
    fontWeight: "bold",
    position: "absolute",
    color: color.black,
    backgroundColor: color.torquoise,
    top: 30,
    right: 20,
  },
  motto: {
    marginTop: 5,
  },
  mottoText: {
    color: color.white,
    fontSize: fontSizes.xl,
    fontFamily: fonts.customAri,
  },
  btnWrapper: {
    position: "absolute",
    bottom: height / 7,
    marginLeft: 20,
  },
  userText: {
    color: color.white,
    fontSize: fontSizes.lg,
  },
});
