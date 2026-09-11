import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedButtonApproved = (props) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && (
        <Text
          style={[styles.btnText, props.disabled && styles.btnTextDisabled]}
        >
          {props.text}
        </Text>
      )}
      {props.loading && <ActivityIndicator size={24} color={ColorsBarber.light.textColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontWeight: "bold",
  },
  btnTextDisabled: {
    color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: ColorsBarber.light.inActiveTextColor,
    backgroundColor: ColorsBarber.light.btnBgColorDisabled,
    color: ColorsBarber.light.inActiveTextColor,
  },

  btn: {
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    minHeight: 50,
  },
});
export default SharedButtonApproved;
