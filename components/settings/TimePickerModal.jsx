import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useLocalization } from "@/contexts/LocalizationContext";

const generateTimes = (startValue, endValue, step = 10) => {
  const times = [];

  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const toTimeString = (minutes) => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  let current = toMinutes(startValue);
  const end = toMinutes(endValue);

  while (current <= end) {
    const time = toTimeString(current);

    times.push({
      label: time,
      value: time,
    });

    current += step; // npr. 10 minuta
  }

  return times;
};


const TimePickerModal = ({ setVisible, visible, onCancel, onConfirm, startValue, endValue, interval }) => {
  const [selectedTime, setSelectedTime] = useState(startValue);
  const { localization } = useLocalization();
  const times = generateTimes(startValue, endValue, interval);
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
              <Text style={styles.cancel}>{localization.PLACES.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDone}>
              <Text style={styles.done}>{localization.PLACES.confirmButton}</Text>
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
    color: "#797979",
    fontWeight: "600",
    padding: 10
  },

  done: {
    fontSize: 16,
    color: "#fdfdfd",
    fontWeight: "600",
    padding: 10
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
