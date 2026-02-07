import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  icon: any;
  onPress: () => void;
};

export default function SettingsItem({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    padding: 18,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginLeft: 12,
    flex: 1,
    fontSize: 17,
  },
});
