import { getInitialsName } from "@/helpers";
import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberItemAssign({ id, item, toggleBarber }) {
  const checkHandler = (item, id) => {
    if (id) return;
    toggleBarber(item);
  };
  const initials = getInitialsName(item.name);

  return (
    <TouchableOpacity
      style={[styles.barberItem, item.deletedAt && styles.deletedAt]}
      onPress={() => checkHandler(item, id)}
    >
      <View style={styles.barberPositionDeatils}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
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
        <FontAwesome name="close" size={25} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deletedAt: {
    backgroundColor: "#000000",
    opacity: 0.4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  centerCheckMark: {
    justifyContent: "center",
  },
  barberInfo: {
    alignSelf: "center",
  },
  barberPositionDeatils: {
    gap: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  barberItem: {
    backgroundColor: "#2A2A2A", // Malo svetlija siva za dodeljene radi kontrasta
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    // Suptilna senka za Android
    elevation: 2,
  },
  barberText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "left",
  },
});
