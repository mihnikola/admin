import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function DateAbsentComponent({
  setShowDate,
  date,
  showDate,
  onDateChange,
}) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  const parts = formatter.formatToParts(date);
  const custom = `${parts[0].value}. ${parts[2].value}. ${parts[4].value}`;

  return (
    <>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDate(true)}
      >
        <Text style={styles.dateText}>{custom}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
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
  button: {
    backgroundColor: "rgb(0, 0, 0)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 5,
  },
});

export default DateAbsentComponent;
