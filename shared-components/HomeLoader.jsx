import { ActivityIndicator, StyleSheet, View } from "react-native";

const HomeLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color="#b9b9b9ff" />
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 1000
  }
});

export default HomeLoader;