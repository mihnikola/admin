import React, { useEffect, useState } from "react";
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

const TimePickerModal = ({
  setVisible,
  visible,
  onCancel,
  onConfirm,
  startValue,
  endValue,
  value,
  interval,
  activeTab,
  title
}) => {
  const [selectedTime, setSelectedTime] = useState(value);
  const { localization } = useLocalization();
  const times = generateTimes(startValue, endValue, interval);

  useEffect(() => {
    setSelectedTime(value);
  }, [activeTab]);

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
          <Text style={styles.modalTitle}>{title}</Text>

          <WheelPicker
            data={times}
            value={selectedTime}
            onValueChanged={({ item }) => setSelectedTime(item.value)}
            itemTextStyle={styles.itemText}
            selectedItemTextStyle={styles.selectedItemText}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={onDone} style={styles.actionButtonNo}>
              <Text style={styles.actionButtonText}>
                {localization.PLACES.confirmButton}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                {localization.PLACES.cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  openBtn: {
    fontSize: 18,
    color: "#007AFF",
  },
  actionButtonText: {
    color: "#FFFFFF", // Corresponds to text-white
    fontSize: 18, // Corresponds to text-lg
    fontWeight: "600", // Corresponds to font-semibold
    textAlign: "center",
  },
    modalTitle: {
    color: "#FFFFFF", // Corresponds to text-white
    fontSize: 20, // Corresponds to text-3xl
    fontWeight: "bold", // Corresponds to font-bold
    marginBottom: 16, // Corresponds to mb-4
    textAlign: "center",
    lineHeight: 36, // Corresponds to leading-tight
  },
  actionButton: {
    width: "50%", // Corresponds to w-full
    backgroundColor: "black", // Corresponds to bg-blue-600
    paddingVertical: 16, // Corresponds to py-4
    borderRadius: 8, // Corresponds to rounded-lg
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  actionButtonNo: {
    width: "50%", // Corresponds to w-full
    backgroundColor: "#36454F", // Corresponds to bg-blue-600
    paddingVertical: 16, // Corresponds to py-4
    borderRadius: 8, // Corresponds to rounded-lg
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 2)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#433d3c", // Corresponds to bg-gray-800
    borderRadius: 12, // Corresponds to rounded-xl
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15, // For Android shadow
    padding: 32, // Corresponds to p-8
    maxWidth: 384, // Corresponds to max-w-sm
    width: "100%", // Corresponds to w-full
    alignItems: "center", // Centers text and icon
  },

  header: {
    flexDirection: "row",
    gap: 20,
  },

  cancel: {
    fontSize: 16,
    color: "#797979",
    fontWeight: "600",
    padding: 10,
    letterSpacing: 2,
  },

  done: {
    fontSize: 16,
    color: "#fdfdfd",
    fontWeight: "600",
    padding: 10,
    letterSpacing: 2,
  },

  itemText: {
    fontSize: 24,
    color: "#ffffff",
  },

  selectedItemText: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
});
export default TimePickerModal;
