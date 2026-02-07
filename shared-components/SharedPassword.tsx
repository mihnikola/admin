import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SharedPassword(props: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <View
        style={[
          styles.passwordInputContainer,
          isFocused && styles.textInputFocused,
        ]}
      >
        <TextInput
          {...props}
          style={styles.passwordInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="grey"
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <Text style={{ color: "#888" }}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {props.value.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,

    borderColor: "#333",
  },
  passwordInput: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  errorText: {
    color: "red",
  },
  textInputFocused: {
    borderColor: "#2596be",
  },
  passwordToggle: {
    padding: 10,
  },
});
