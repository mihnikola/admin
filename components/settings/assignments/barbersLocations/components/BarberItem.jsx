import { getInitialsName } from "@/helpers";
import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberItem({ item, toggleBarber, isAssigned }) {
  const initials = getInitialsName(item.name);

  return (
    <TouchableOpacity
      style={[styles.barberItem, isAssigned && styles.barberItemAssigned]}
      onPress={() => toggleBarber(item)}
      activeOpacity={0.7}
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
          <Text style={styles.barberName}>{item.name}</Text>
          <Text style={styles.barberSeniority}>{item.seniority.title}</Text>
        </View>
      </View>
      
      {/* Akciono dugme: Plus ili Close sa kružnom pozadinom */}
      <View style={[styles.actionButton, isAssigned ? styles.actionButtonClose : styles.actionButtonPlus]}>
        <FontAwesome 
          name={isAssigned ? "close" : "plus"} 
          size={isAssigned ? 18 : 14} 
          color="white" 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 barberItem: {
    backgroundColor: "#1E1E1E", // Tamnija siva za nedodeljene
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
  barberItemAssigned: {
    backgroundColor: "#2A2A2A", // Malo svetlija siva za dodeljene radi kontrasta
    borderColor: "#3A3A3A",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
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
  barberPositionDeatils: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  barberInfo: {
    flex: 1,
    justifyContent: "center",
  },
  barberName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 2,
  },
  barberSeniority: {
    color: "#AAA", // Svetlija siva za titulu
    fontSize: 14,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  actionButtonPlus: {
    backgroundColor: "#85b2bd", // Akcentovana boja za dodavanje
  },
  actionButtonClose: {
    backgroundColor: "#555", // Neutralnija siva za uklanjanje
  },
});