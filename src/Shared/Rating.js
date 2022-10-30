import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../constants/colors";

const Rating = ({ isNum, isReview, size }) => {
  const MAX_RATING = 5;
  const MIN_RATING = 3;
  const [rating] = React.useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );
  const deci = Number(Math.random().toFixed(1));
  return (
    <View style={styles.star}>
      {isReview && <Text className="tw-mr-2">Review: </Text>}
      {Array(rating)
        .fill()
        .map((_, i) => (
          <MaterialIcons
            name="star"
            size={size}
            key={i}
            color={color.red}
            style={styles.back}
          />
        ))}
      {isNum && <Text className="tw-ml-1"> {rating + deci}</Text>}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
});
