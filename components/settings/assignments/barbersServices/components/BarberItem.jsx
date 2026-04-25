import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberItem({ id, item, assignmentHandler }) {
  const checkHandler = (item, id) => {
    if (id) return;
    assignmentHandler(item);
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
      <View style={{ width: "70%", marginLeft: 10 }}>
        <View>
          <Text style={styles.barberText}>{item.name}</Text>
        </View>
        {item.seniority && (
          <View>
            <Text style={styles.barberText}>{item.seniority.title}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
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
  barberItem: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  barberText: {
    color: "#fff",
    fontSize: 15,
  },
});
