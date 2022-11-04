import { StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Card, Title } from "react-native-paper";
import React from "react";
import { color } from "../constants/colors";
import truncate from "../utilities/truncate";
import { fontSizes } from "../constants/fonts";

// const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

export default function AllProducts({ products, navigation }) {
  // select product func
  function selectProduct(product) {
    navigation.navigate("Single-Screen", { singleProduct: product });
  }
  return (
    <ScrollView style={styles.container} horizontal={true}>
      <FlatGrid
        itemDimension={130}
        data={products}
        style={styles.gridView}
        renderItem={({ item }) => (
          <Card key={item._id} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => selectProduct(item)}>
              <Card.Cover
                style={styles.image}
                source={{ uri: item?.images[0] }}
              />
            </TouchableOpacity>
            <Card.Content style={styles.info}>
              <Title style={styles.itemName}>{item?.name}</Title>
              <Text style={styles.itemDesc}>
                {truncate(item?.description, 7)}
              </Text>
              <Text style={styles.itemPrice}>USD ${item?.price}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </ScrollView>
  );
}

// const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    paddingBottom: 10,
    height: 300,
    overflow: "hidden",
  },
  image: {
    height: 300,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  info: {
    position: "absolute",
    backgroundColor: color.white,
    bottom: -11,
    right: 0,
    left: 0,
    height: 70,
  },
  itemName: {
    fontSize: fontSizes.xs,
    color: color.chocolate,
    fontWeight: "900",
    marginBottom: -6,
    lineHeight: 12,
    marginTop: 5,
  },
  itemPrice: {
    fontWeight: "500",
    fontSize: 14,
    color: color.chocolate,
  },
  itemDesc: {
    fontSize: 12,
    marginTop: 5,
    color: color.darkgrey,
  },
});
