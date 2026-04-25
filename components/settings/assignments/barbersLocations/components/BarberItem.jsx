import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberItem({ id, item, toggleBarber }) {
  const checkHandler = (item, id) => {
    if (id) return;
    toggleBarber(item);
  };
  const initials = item.name.trim().includes(" ")
    ? item.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : item.name.substring(0, 2).toUpperCase();
  return (
    <TouchableOpacity
      style={styles.barberItem}
      onPress={() => checkHandler(item, id)}
    >
      <View style={styles.barberPositionDeatils}>
        {item.image && (
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}

        {!item.image && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        )}
        <View style={styles.barberInfo}>
          <Text style={styles.barberText}>{item.name}</Text>
          <Text style={styles.barberText}>{item.seniority.title}</Text>
        </View>
      </View>
      <View style={styles.centerCheckMark}>
        <FontAwesome name="plus" size={15} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  centerCheckMark: {
    justifyContent: "center",
  },
  barberInfo: {
    alignSelf: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  barberPositionDeatils: {
    gap: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  barberItem: {
    backgroundColor: "#424242",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  barberText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "left",
  },
});
