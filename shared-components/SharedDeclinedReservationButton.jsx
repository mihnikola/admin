import { ColorsBarber } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedDeclinedReservationButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && (
        <ActivityIndicator size={24} color={ColorsBarber.light.textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.inActiveTextColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
  },

  btn: {
    backgroundColor: ColorsBarber.light.textColor,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    alignItems: "center",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
});
export default SharedDeclinedReservationButton;
