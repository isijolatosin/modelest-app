import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import React from "react";
import { color } from "../constants/colors";

const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

export default function AllProducts({ products }) {
  return (
    <ScrollView style={styles.container} horizontal={true}>
      <Card style={styles.card}>
        <Card.Cover
          style={{ height: 300 }}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card Price</Paragraph>
          <Paragraph>Card Long description</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Cover
          style={{ height: 300 }}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card Price</Paragraph>
          <Paragraph>Card Long description</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Cover
          style={{ height: 300 }}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card Price</Paragraph>
          <Paragraph>Card Long description</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: color.chocolate,
    padding: 20,
  },
  card: {
    width: width - 50,
    marginRight: 40,
    //  height: 400,
  },
});
