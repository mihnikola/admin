import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function TimeAbsentComponent({
  setShowFromPicker,
  time,
  placeholder,
}) {
  return (
    <TouchableOpacity
      style={styles.dateButton}
      onPress={() => setShowFromPicker(true)}
      activeOpacity={0.7}
    >
      <Text style={styles.dateText}>{time || placeholder}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#838383",
    borderRadius: 15
  },

  dateText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default TimeAbsentComponent;
