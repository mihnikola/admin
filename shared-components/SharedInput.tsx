import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export function SharedInput(props: any){
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      {props.stylePassword && (
        <Text style={styles.inputLabel}>{props.label}</Text>
      )}
      <View
        style={[
          props.stylePassword,
          isFocused && props.stylePassword && styles.textInputFocused,
        ]}
      >
        {!props.stylePassword && (
          <Text style={styles.inputLabel}>{props.label}</Text>
        )}
       

        <TextInput
          {...props}
          style={[
            props.style,
            !props.stylePassword && isFocused && styles.textInputFocused,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={props.stylePassword && !isPasswordVisible}
          placeholderTextColor="grey"
        />
        {props.stylePassword && !props.dataDetectorTypes && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Text style={{ color: "#888" }}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props.value.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  prefixText: {
    color: "black",
    fontSize: 16,
    marginRight: 8,
    fontWeight: "medium", // Make prefix stand out
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
  flagIcon: {
    width: 24, // Adjust size as needed
    height: 18, // Adjust size as needed, maintain aspect ratio
    marginRight: 8,
    borderRadius: 2, // Slightly rounded corners for the flag
  },
});

