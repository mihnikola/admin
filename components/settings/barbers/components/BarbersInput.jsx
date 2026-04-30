import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { forwardRef, useState } from "react";

const BarbersInput = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, props.error && styles.error]}>
      <View style={styles.iconContainer}>
        <FontAwesome name={props.icon} size={20} color="#aaa" />
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={[styles.viewContainer, props.dataDetectorTypes && styles.phoneNumberContainer]}>

          {props.dataDetectorTypes && (
            <Image
              source={require("../../../../assets/images/serbiaFlag.png")}
              style={styles.flagIcon}
            />
          )}
          {props.dataDetectorTypes && <Text style={styles.prefixText}>+381</Text>}
          <TextInput
            {...props}
            style={styles.input}
            value={props.value}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor="#777"
            keyboardType={props.keyboardType}
          />
        </View>
      </View>
    </View>
  );

});

const styles = StyleSheet.create({
  phoneNumberContainer: {
    flexDirection: "row"
  },
  viewContainer: {
    flex: 1
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 12,
    marginBottom: 7,
  },
  flagIcon: {
    width: 24, // Adjust size as needed
    height: 18, // Adjust size as needed, maintain aspect ratio
    borderRadius: 2, // Slightly rounded corners for the flag
  },
  prefixText: {
    color: "grey",
    fontSize: 16,
    marginRight: 8,
    fontWeight: "medium", // Make prefix stand out
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },

  iconContainer: {
    marginRight: 14,
  },

  label: {
    color: "#9e9e9e",
    fontSize: 12,
    marginBottom: 2,
  },

  input: {
    color: "#fff",
    fontSize: 16,
    padding: 0,
    width: "100%"
  },
});

export default BarbersInput;