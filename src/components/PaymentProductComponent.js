import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import React from "react";
import { color } from "../constants/colors";
import truncate from "../utilities/truncate";
import { fontSizes } from "../constants/fonts";

export default function PaymentProductComponent({ products }) {
  return (
    <ScrollView
      style={[styles.gridView, { maxHeight: 260 }]}
      horizontal={false}
    >
      {products?.details?.map((item) => (
        <View key={item?.id} style={styles.itemContainer}>
          <Image
            source={{ uri: item?.product?.images[0] }}
            style={styles.image}
          />
          <View style={{ flex: 0.6 }}>
            <View style={styles.info}>
              <Text style={{ fontWeight: "bold", fontSize: fontSizes.xs }}>
                <Text style={{ color: color.gold }}>Title: </Text>
                {item?.product?.name}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: fontSizes.xs }}>
                <Text style={{ color: color.gold }}>Price: </Text>${" "}
                {item?.product?.price} x {item?.quantity}
              </Text>
              <Text style={{ fontSize: fontSizes.xs }}>
                <Text
                  style={{
                    color: color.gold,
                    fontWeight: "bold",
                    fontSize: fontSizes.xs,
                  }}
                >
                  Description:{" "}
                </Text>
                {truncate(item?.product?.description, 10)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  gridView: {
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    maxHeight: 140,
    backgroundColor: color.offWhite,
  },
  image: {
    height: "100%",
    flex: 0.4,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  info: {
    paddingHorizontal: 10,
  },
  itemName: {
    fontSize: 14,
    color: color.chocolate,
    fontWeight: "900",
    marginBottom: -6,
  },
  itemPrice: {
    fontWeight: "500",
    fontSize: 14,
    color: color.chocolate,
  },
  itemDesc: {
    fontSize: 12,
    color: color.darkgrey,
  },
});
