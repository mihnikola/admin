import React from "react";
import { StyleSheet, Text } from "react-native";

function LimitDescription({ title, subTitle, description }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#cecece",
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#949393",
    lineHeight: 23,
  },
  description: {
    fontWeight: "bold",
    marginBottom: 20,
    color: "#cecece",
    fontSize: 19,
  },
});

export default LimitDescription;
