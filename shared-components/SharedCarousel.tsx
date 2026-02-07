import { Image, StyleSheet, Text, View } from "react-native";

const SharedCarousel = ({title, length}) => {
  return (
    <View>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{title}  {length > 0 && `(${length})`}</Text>
      </View>
    </View>
  );
};
export default SharedCarousel;
const styles = StyleSheet.create({
  containerOptions: {
    paddingTop: 10,
  },
  coverImage: {
    width: "100%",
    height: 210,
    opacity: 0.2,
  },
  captureContainer: {
    position: "absolute",
    flexDirection: "row", // Horizontalni raspored elemenata
    alignItems: "flex-end", // Vertikalno centriranje sadržaja unutar kontejnera
    height: 200,
    paddingLeft: 20, // Padding unutar kontejnera
  },
  capture: {
    fontSize: 32, // Veličina fonta
    color: "white", // Bela boja teksta
    fontWeight: "500", // Debeli font
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d66",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    color: "#fff",
    marginLeft: 12,
    flex: 1,
  },
});
