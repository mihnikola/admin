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
      {props.loading && <ActivityIndicator size={25} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  btn: {
    backgroundColor: "#B22222", // Elegantnija tamno crvena
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    padding: 30,
  },
});
export default SharedButtonRejected;
