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
      {props.loading && <ActivityIndicator size={24} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  btn: {
    backgroundColor: "#B22222", // Elegantnija tamno crvena
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    padding: 40,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
});
export default SharedDeclinedReservationButton;
