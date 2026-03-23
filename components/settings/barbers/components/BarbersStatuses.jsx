import { FontAwesome } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function BarbersStatuses({
  statuses,
  modalVisible,
  setModalVisible,
  handleStatusSelect,
  selected,
}) {
  const onConfirm = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tipovi odobravanja</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {statuses?.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={styles.item}
                  onPress={() => handleStatusSelect(item)}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.itemSubtitle}
                  >
                    {item.name.nameLocal}
                  </Text>
                  {selected && (
                    <FontAwesome
                      name={item._id === selected._id && "check-circle-o"}
                      size={28}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={onConfirm} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.98)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#433d3c",
    borderRadius: 12,
    shadowColor: "#000",
    padding: 32,
    width: "100%",
    maxHeight: "60%",
  },
  item: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  itemSubtitle: {
    flex: 2,
    fontSize: 16,
    color: "white",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default BarbersStatuses;
