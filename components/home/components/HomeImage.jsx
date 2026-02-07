import React from "react";
import { Image, StyleSheet } from "react-native";

const HomeImage = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.backImage} />;
};

const styles = StyleSheet.create({
  backImage: {
    width: 200,
    height: 300,
  },
});

export default HomeImage;