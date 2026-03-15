import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function BarbersInput({
  icon,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={20} color="#aaa" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#777"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 12,
    marginBottom: 7,
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