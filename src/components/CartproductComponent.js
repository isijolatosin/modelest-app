import {
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { color } from "../constants/colors";
import truncate from "../utilities/truncate";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "../slices/appSlices";
import { useDispatch } from "react-redux";
import { colors } from "react-native-swiper-flatlist/src/themes";
import { fontSizes } from "../constants/fonts";

// const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

const { width } = Dimensions.get("window");
export default function CartproductComponent({ products, navigation }) {
  const dispatch = useDispatch();
  // select product func
  const increaseOrder = (item) => {
    dispatch(increaseCartItem(item));
  };
  const decreaseOrder = (item) => {
    dispatch(decreaseCartItem(item));
  };
  const removeOrder = (item) => {
    dispatch(removeCartItem(item));
  };
  return (
    <ScrollView style={[styles.gridView, { maxHeight: 260 }]} horizontal={true}>
      {products?.map((item) => (
        <View key={item?.id} style={styles.itemContainer}>
          <Image source={{ uri: item?.image }} style={styles.image} />
          <View style={{ flex: 0.6 }}>
            <View style={styles.info}>
              <Text style={{ fontWeight: "bold", fontSize: fontSizes.xs }}>
                <Text style={{ color: color.gold }}>Title: </Text>
                {item?.name}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: fontSizes.xs }}>
                <Text style={{ color: color.gold }}>Price: </Text>${" "}
                {item?.price} x {item?.quantity}
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
                {truncate(item?.description, 10)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: width / 4,
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {item?.quantity <= 1 ? (
                  <TouchableOpacity onPress={() => removeOrder(item)}>
                    <AntDesign name="minus" size={15} style={{ margin: 5 }} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => decreaseOrder(item)}>
                    <AntDesign name="minus" size={15} style={{ margin: 5 }} />
                  </TouchableOpacity>
                )}
                <Text>{item?.quantity}</Text>
                <TouchableOpacity onPress={() => increaseOrder(item)}>
                  <AntDesign name="plus" size={15} style={{ margin: 5 }} />
                </TouchableOpacity>
              </View>
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
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.2,
    marginBottom: 5,
    marginRight: 5,
    borderBottomColor: colors.lightgrey,
    width: width - 30,
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
