import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { forwardRef } from "react";

const ServiceInput = forwardRef((props, ref) => {
  return (
    <View style={[styles.container, props.error && styles.error]}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={props.icon}
          size={props.icon === "history" ? 24 : 20}
          color="#aaa"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{props.label}</Text>

        <TextInput
          {...props}
          ref={ref}
          style={styles.input}
          value={props.value}
          onChangeText={
            props.keyboardType === "numeric"
              ? props.onChangeText(props.setValue, 1000)
              : props.onChangeText
          }
          placeholder={props.placeholder}
          placeholderTextColor="#777"
          keyboardType={props.keyboardType}
        />
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 12,
    marginBottom: 7,
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
  },
});

export default ServiceInput;
