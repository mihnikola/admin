import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SharedApprovedReservationButton = (props) => {
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
  btnTextDisabled: {
    color: "#3f3f3fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: "grey",
    backgroundColor: "#8b8b8bff",
    color: "#3f3f3fff",
  },

  btn: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    padding: 40,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    minHeight: 50,
  },
});
export default SharedApprovedReservationButton;
