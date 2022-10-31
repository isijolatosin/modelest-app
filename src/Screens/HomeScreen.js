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
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);

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

  return (
    <View style={styles.container}>
      <PictureSlide images={allWigsCloudinaryImg} />
      <View style={styles.log}>
        {storedCredentials?.email ? (
          <TouchableOpacity onPress={clearLogin}>
            <Text style={styles.loginout}>LogOut</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login-Screen")}>
            <Text style={styles.loginout}>LogIn</Text>
          </TouchableOpacity>
        )}
      </View>
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
        <TouchableOpacity onPress={() => navigation.navigate("Shop-Screen")}>
          <Button
            style={styles.btn}
            title="Shop"
            size={18}
            clr={color.gold}
            bgclr={color.black}
            width={width / 3}
            rounded={50}
          />
        </TouchableOpacity>
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
    backgroundColor: color.white,
    top: 30,
    right: 10,
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
  log: {
    position: "absolute",
    flexDirection: "row",
    top: 55,
    left: 0,
    marginLeft: 20,
    backgroundColor: color.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginout: {
    marginHorizontal: 5,
    color: color.gold,
    fontSize: fontSizes.sm,
    fontWeight: "bold",
  },
});
