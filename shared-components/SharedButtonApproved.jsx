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
      {props.loading && <ActivityIndicator size={25} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
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
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    padding: 60,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});
export default SharedButtonApproved;
