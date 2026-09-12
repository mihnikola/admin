import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SharedButtonCancel = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Bold",
    fontSize: 18,
  },

  btn: {
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    alignItems: "center",
    marginTop: 20,
    padding: 30,
  },
});
export default SharedButtonCancel;
