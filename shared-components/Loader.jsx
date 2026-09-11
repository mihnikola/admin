import { ColorsBarber } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={ColorsBarber.light.textColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsBarber.light.background,
  },
});

export default Loader;
