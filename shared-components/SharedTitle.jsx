import { StyleSheet, Text, View } from "react-native";

function SharedTitle({ title }) {
  return (
    <View style={styles.captureContainer}>
      <Text style={styles.capture}>{title}</Text>
    </View>
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
export default SharedTitle;