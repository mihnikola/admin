import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
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
        <View
          style={[
            styles.viewContainer,
            props.dataDetectorTypes && styles.phoneNumberContainer,
          ]}
        >
          {props.dataDetectorTypes && (
            <Image
              source={require("../../../../assets/images/serbiaFlag.png")}
              style={styles.flagIcon}
            />
          )}
          {props.dataDetectorTypes && (
            <Text style={styles.prefixText}>+381</Text>
          )}
          {!props.lock && (
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
          )}
          {props.lock && (
            <TouchableOpacity style={styles.lockRow} onPress={props.onPress}>
              <Text style={styles.lock}>{props.lock}</Text>
              <Feather name="chevron-right" size={25} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {props.lock && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={props.onPress}
          activeOpacity={0.7}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  lockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  lock: {
    color: "#fff",
    fontSize: 15,
  },
  phoneNumberContainer: {
    flexDirection: "row",
  },
  viewContainer: {
    flex: 1,
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
    borderColor: "red",
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
    width: "100%",
  },
});

export default BarbersInput;
