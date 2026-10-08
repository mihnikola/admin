import { ColorsBarber } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SharedConfirmPassword = forwardRef((props: any, ref) => {
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
          ref={ref}
          placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color={ColorsBarber.dark.textColorInput}
          />
        </TouchableOpacity>
      </View>
      {props.value.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
});
const styles = StyleSheet.create({
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,

    borderColor: ColorsBarber.dark.inActiveTextColor,
  },
  passwordInput: {
    backgroundColor: "white",
    color: ColorsBarber.dark.textColorInput,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    width: "80%",
    fontFamily: "OldStandard-Regular",
  },
  inputLabel: {
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
    fontSize: 14,
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
  textInputFocused: {
    borderColor: ColorsBarber.dark.textColor,
  },
  passwordToggle: {
    padding: 10,
  },
});

export default SharedConfirmPassword;
