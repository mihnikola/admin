import { useLocalization } from "@/contexts/LocalizationContext";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

// ⏰ Generate slots
const generateTimeSlots = ({ start, end, interval }) => {
  const slots = [];

  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);

  while (current <= endTime) {
    slots.push(current.toTimeString().slice(0, 5));
    current = new Date(current.getTime() + interval * 60000);
  }

  return slots;
};

export default function BookingPickerModal({ visible, onClose, onSelect }) {
  const { localization } = useLocalization();
  const [selectedTime, setSelectedTime] = useState(null);

  const slots = generateTimeSlots({
    start: "00:00",
    end: "23:30",
    interval: 30,
  });

  const handleConfirm = () => {
    if (selectedTime) {
      onSelect(selectedTime);
      onClose();
      setSelectedTime(null);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{localization.TIMES.title}</Text>

          {/* <View style={styles.slotsContainer}>
            {slots.map((slot) => (
              <TouchableOpacity
                key={slot}
                onPress={() => setSelectedTime(slot)}
                style={[
                  styles.slot,
                  selectedTime === slot && styles.selectedSlot,
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedTime === slot && styles.selectedSlotText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}

          <ScrollView
            style={{ flexGrow: 1 }}
            contentContainerStyle={styles.slotsContainer}
            showsVerticalScrollIndicator={false}
          >
            {slots.map((slot) => (
              <TouchableOpacity
                key={slot}
                onPress={() => setSelectedTime(slot)}
                style={[
                  styles.slot,
                  selectedTime === slot && styles.selectedSlot,
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedTime === slot && styles.selectedSlotText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>{localization.BUTTONS.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.confirm, !selectedTime && { opacity: 0.5 }]}>
                {localization.BUTTONS.ok}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000",
  },
  modal: {
    backgroundColor: "#000",
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
  },
  slotsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 30,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#000000",
    borderRadius: 8,
    margin: 5,
    borderColor: 'white',
    borderWidth: 1
  },
  selectedSlot: {
    backgroundColor: "#ffffff",
  },
  slotText: {
    color: "#ffffff",
  },
  selectedSlotText: {
    color: "#020202",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancel: {
    color: "white",
    fontSize: 16,
  },
  confirm: {
    color: "#f1f1f1",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#000000"
  },
});
