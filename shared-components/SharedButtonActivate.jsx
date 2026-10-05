import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedButtonActivate = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && <ActivityIndicator size={25} color={ColorsBarber.dark.textColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 16,
    fontFamily:"OldStandard-Bold",
    letterSpacing: 0.5,
  },

  btn: {
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    padding: 60,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    backgroundColor:ColorsBarber.dark.item,
  },
});
export default SharedButtonActivate;
