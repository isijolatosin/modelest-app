import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../constants/colors";
import { fontSizes } from "../constants/fonts";

const Slideshow = ({ product }) => {
  return (
    <View style={styles.item}>
      {product?.images?.length > 0 ? (
        <View>
          <FlatList
            horizontal={true}
            data={product?.images}
            renderItem={({ item, idx }) => (
              <View key={idx}>
                <Image
                  source={{
                    uri: item,
                  }}
                  alt={item}
                  style={styles.image}
                />
              </View>
            )}
          />
          <View style={styles.slogan}>
            <Text style={styles.sloganText}>modelEst...</Text>
          </View>
          <View style={styles.videoWrap}>
            <TouchableOpacity
              style={[
                styles.video,
                {
                  backgroundColor: product?.video
                    ? color.blackTrans
                    : color.greyTrans,
                },
              ]}
              onPress={() => Linking.openURL(product?.video)}
            >
              <Ionicons
                name="play"
                size={20}
                color={product?.video ? color.white : color.lightgrey}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.text}>
          <Text>No Image Found</Text>
        </View>
      )}
    </View>
  );
};

export default Slideshow;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  item: {
    position: "relative",
  },
  image: {
    marginRight: 10,
    width: width - 30,
    height: height / 1.5,
    borderRadius: 10,
  },
  slogan: {
    padding: 5,
    position: "absolute",
    bottom: 0,
  },
  sloganText: {
    fontStyle: "italic",
    color: color.black,
    fontSize: fontSizes.xs,
  },
  video: {
    position: "absolute",
    bottom: 40,
    left: 10,
    borderRadius: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
