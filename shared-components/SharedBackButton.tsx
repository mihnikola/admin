import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const SharedBackButton = ({ onPress, styleBtn, absolutePosition = true }) => {
  return (
    <TouchableOpacity
      style={[absolutePosition && styles.btnStyle, styleBtn]}
      hitSlop={20}
      onPress={onPress}
    >
      <MaterialIcons name="arrow-back" size={25} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    zIndex: 9999,
    position: "absolute",
    left: 15,
    top: 20,
  },
});

export default SharedBackButton;
