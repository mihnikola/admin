import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ColorsBarber } from "@/constants/Colors";

export default function LocationInput({ icon, label, placeholder, city }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={icon}
          size={20}
          color={ColorsBarber.dark.textColor}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>

        {city && (
          <Text
            style={styles.input}
            placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
          >
            {placeholder}
            {","}
            {city}
          </Text>
        )}
        {!city && (
          <Text
            style={styles.input}
            placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
          >
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
    backgroundColor: ColorsBarber.dark.item,
    borderRadius: 16,
    padding: 12,
    marginBottom: 7,
  },

  iconContainer: {
    marginRight: 14,
  },

  label: {
    color: ColorsBarber.dark.textColor,
    fontSize: 12,
    marginBottom: 2,
    fontFamily: "OldStandard-Bold",

  },

  input: {
    color: ColorsBarber.dark.textColor,
    fontSize: 16,
    padding: 0,
    fontFamily: "OldStandard-Bold",

  },
});
