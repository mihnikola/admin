import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberItemAssign({ id, item, toggleBarber }) {
  const checkHandler = (item, id) => {
    if (id) return;
    toggleBarber(item);
  };
  return (
    <TouchableOpacity
      style={styles.barberItem}
      onPress={() => checkHandler(item, id)}
    >
      <View style={styles.barberPositionDeatils}>
        <Image source={{ uri: item.image }} style={styles.image} />
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
