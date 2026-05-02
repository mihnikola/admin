import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function LocationInput({ icon, label, placeholder, city }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={20} color="#aaa" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>

        {city && (
          <Text style={styles.input} placeholderTextColor="#777">
            {placeholder}{","}{city}
          </Text>
        )}
         {!city && (
          <Text style={styles.input} placeholderTextColor="#777">
            {placeholder} 
          </Text>
        )}
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
