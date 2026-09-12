import { ColorsBarber } from "@/constants/Colors";
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
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.inActiveTextColor,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "justify",
    fontFamily: "OldStandard-Regular",

    color: ColorsBarber.light.inActiveTextColor,
    lineHeight: 23,
  },
  description: {
    fontFamily: "OldStandard-Bold",
    marginBottom: 20,
    color: ColorsBarber.light.inActiveTextColor,
    fontSize: 19,
  },
});

export default LimitDescription;
