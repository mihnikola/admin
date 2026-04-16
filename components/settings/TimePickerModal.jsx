import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import WheelPicker from "@quidone/react-native-wheel-picker";

const generateTimes = () => {
  const times = [];

  for (let h = 9; h <= 22; h++) {
    ["00", "30"].forEach((m) => {
      if (h === 22 && m !== "00") return;

      const hour = h.toString().padStart(2, "0");

      times.push({
        label: `${hour}:${m}`,
        value: `${hour}:${m}`,
      });
    });
  }

  return times;
};

const TimePickerModal = ({ setVisible, visible, onCancel, onConfirm }) => {
  const [selectedTime, setSelectedTime] = useState("09:00");
  const times = generateTimes();
  const onDone = () => {
    setVisible(false);
    onConfirm(selectedTime);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDone}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Wheel */}
          <WheelPicker
            data={times}
            value={selectedTime}
            onValueChanged={({ item }) => setSelectedTime(item.value)}
            itemTextStyle={styles.itemText}
            selectedItemTextStyle={styles.selectedItemText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    padding: 16,
  },

  openBtn: {
    fontSize: 18,
    color: "#007AFF",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 2)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#000000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  cancel: {
    fontSize: 16,
    color: "#FF3B30",
  },

  done: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },

  itemText: {
    fontSize: 18,
    color: "#ffffff",
  },

  selectedItemText: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
});
export default TimePickerModal;
