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
import { REACT_APP_LOGO } from "@env";
import { color } from "../constants/colors";
import { REACT_APP_CLOUDINARY_WIGS, REACT_APP_CLOUDINARY_BASEURL } from "@env";
import PictureSlide from "../components/PictureSlide";
import { fonts, fontSizes } from "../constants/fonts";
import Button from "../Shared/Button";
import { Avatar } from "react-native-paper";

const { height, width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [allWigsCloudinaryImg, setAllWigsCloudinaryImg] = React.useState([]);

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
        `${REACT_APP_CLOUDINARY_BASEURL}${version}/${public_id}.${format}`
      );
    });

    setAllWigsCloudinaryImg(images);
  };
  React.useEffect(() => {
    fetchCloudinaryImages();
    // fetchProducts();
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
      <Avatar.Image
        style={styles.image}
        size={65}
        source={{
          uri: REACT_APP_LOGO,
        }}
      />
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Shop-Screen")}>
          <Button
            style={styles.btn}
            title="Shop"
            size={18}
            clr={color.gold}
            bgclr={color.black}
            width={width / 3}
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
  image: {
    position: "absolute",
    backgroundColor: color.black,
    top: 40,
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
});
