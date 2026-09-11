import { ColorsBarber } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const SharedBackButton = ({ onPress, styleBtn, absolutePosition = true }) => {
  return (
    <TouchableOpacity
      style={[absolutePosition && styles.btnStyle, styleBtn]}
      hitSlop={20}
      onPress={onPress}
    >
      <MaterialIcons name="arrow-back" size={25} color={ColorsBarber.light.textColor}   />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    zIndex: 9999,
    position: "absolute",
    left: 5,
    top: 20,
  },
});

export default SharedBackButton;
