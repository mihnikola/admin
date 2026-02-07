import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

const SharedButtonDateReservation = (props) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && <ActivityIndicator size={25} color="white" />}
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
    backgroundColor: "#1C1C1E",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    padding: 30
  },
});
export default SharedButtonDateReservation;
