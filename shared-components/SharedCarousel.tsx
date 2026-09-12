import { ColorsBarber } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

const SharedCarousel = ({ title, length }) => {
  return (
    <View>
      <Image
        source={require("@/assets/images/IMG_8211.jpeg")}
        style={styles.coverImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>
          {title} {length > 0 && `(${length})`}
        </Text>
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
    opacity: 0.3,
  },
  captureContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
    paddingLeft: 20,
  },
  capture: {
    fontSize: 32,
    color: ColorsBarber.light.textColor,
    fontWeight: "500",
    fontFamily:"OldStandard-Bold"
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
