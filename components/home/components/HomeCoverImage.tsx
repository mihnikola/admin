import React from "react";
import { Image, StyleSheet, View } from "react-native";

type HomeCoverImageProps = {
  image?: string;
};

const HomeCoverImage: React.FC<HomeCoverImageProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/coverImageFrizer.jpeg")}
        style={styles.backImage}
        resizeMode="cover" // Garancija da se slika vidi cela bez odsecanja
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  backImage: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
});

export default HomeCoverImage;