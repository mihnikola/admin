import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function DateAbsentComponent({
  setShowDate,
  date,
  tempDate,
  showDate,
  showTime,
  onTimeChange,
  onDateChange,
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDate(true)}
      >
        <Text style={styles.dateText}>{date.toLocaleString("en-GB")}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  dateButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default DateAbsentComponent;
