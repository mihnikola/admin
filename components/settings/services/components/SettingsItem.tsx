import { ColorsBarber } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SettingsItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={24} color={ColorsBarber.dark.textColor} />
      <Text style={styles.text}>{title}</Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={ColorsBarber.dark.textColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.item,
    padding: 18,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  text: {
    color: ColorsBarber.dark.textColor,
    marginLeft: 12,
    flex: 1,
    fontSize: 17,
    fontFamily: "OldStandard-Bold",
  },
});
