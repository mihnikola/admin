import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedButtonDeactivate = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && (
        <ActivityIndicator size={25} color={ColorsBarber.light.textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.item,
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "OldStandard-Bold",
  },

  btn: {
    backgroundColor: "#633a3a", // Elegantnija tamno crvena
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    padding: 60,
    fontFamily: "OldStandard-Bold",
  },
});
export default SharedButtonDeactivate;
