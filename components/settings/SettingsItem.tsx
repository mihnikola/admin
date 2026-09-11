import { ColorsBarber } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SettingsItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={24} color={ColorsBarber.light.textColor} />
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={ColorsBarber.light.textColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.light.item,
    padding: 18,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  text: {
    color: ColorsBarber.light.textColor,
    marginLeft: 12,
    flex: 1,
    fontSize: 17,
  },
});
