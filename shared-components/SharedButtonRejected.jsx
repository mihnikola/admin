import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedButtonRejected = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && <ActivityIndicator size={24} color={ColorsBarber.light.textColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.item,
    fontSize: 20,
    fontFamily: "OldStandard-Bold",


  },

  btn: {
    backgroundColor: "#aa2323", // Elegantnija tamno crvena
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor:ColorsBarber.light.inActiveTextColor,
    alignItems: "center",

    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
});
export default SharedButtonRejected;
