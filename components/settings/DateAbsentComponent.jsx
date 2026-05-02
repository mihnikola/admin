import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

function DateAbsentComponent({
  setShowDate,
  date,
  showDate,
  onDateChange,
  label,
  placeholder
}) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedDate = date ? formatter.format(date) : null;

  const handleChange = (event, selectedDate) => {
    setShowDate(false);

    if (event.type === "set" && selectedDate) {
      onDateChange(event, selectedDate);
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDate(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>{label}</Text>

        <Text style={styles.dateText}>{formattedDate || placeholder}</Text>

        <FontAwesome name="calendar-o" size={18} color="#aaa" />
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    color: "#fff",
  },

  dateButton: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 10,
    paddingHorizontal: 12,

    borderWidth: 1,
    borderColor: "#868686",
    borderRadius: 10,

    backgroundColor: "#000000",
  },

  dateText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default DateAbsentComponent;
