import React from "react";
import { StyleSheet, Dimensions, View, Image, Platform } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { variables } from "../constants/variables";

export default function PictureSlide({ images }) {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        // showPagination
        data={images}
        renderItem={({ item }) => (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: item,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: Platform.OS === variables.isAndroid ? height + 30 : height,
  },
  image: {
    width: width,
    height: Platform.OS === variables.isAndroid ? height + 30 : height,
  },
});
