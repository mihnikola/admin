import {
  Modal,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

// Generate 10-min slots (00:00 → 23:50)
const generateTimeSlots = () => {
  const slots = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      slots.push(`${hour}:${min}`);
    }
  }

  return slots;
};
  const slots = generateTimeSlots();

const TimeModal = ({ visible, onClose, onSelect, title = "Select Time" }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={slots}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  onSelect(item);

                  onClose();
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            )}
          />

          {/* Close button */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default TimeModal;
