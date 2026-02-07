import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SharedCoverImage from "./SharedCoverImage";

function SharedTabHeader({ image, title }) {
  return (
    <>
      <SharedCoverImage image={image} />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{title}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  captureContainer: {
    position: "absolute",
    marginHorizontal: 20, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 143,
  },
});
export default SharedTabHeader;
