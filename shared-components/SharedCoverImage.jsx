import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedCoverImage({ image }) {
  return (
    <Image
      // source={{ uri: image }}
      source={require("@/assets/images/frizerskiSalon1.png")}
      style={styles.coverImage}
    />
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.4,
  },
});

export default SharedCoverImage;
