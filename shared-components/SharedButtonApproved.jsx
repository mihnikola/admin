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
      {props.loading && (
        <ActivityIndicator size={24} color={ColorsBarber.dark.textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
  },
  btnTextDisabled: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    borderColor: ColorsBarber.dark.inActiveTextColor,
  },
  btnDisabled: {
    borderColor: ColorsBarber.dark.inActiveTextColor,
    backgroundColor: ColorsBarber.dark.background,
    color: ColorsBarber.dark.inActiveTextColor,
  },

  btn: {
    backgroundColor: ColorsBarber.dark.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    minHeight: 50,
  },
});
export default SharedButtonApproved;
