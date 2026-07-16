import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalization } from "@/contexts/LocalizationContext";

function DateAbsentComponent({
  setShowDate,
  date,
  showDate,
  onDateChange,
  placeholder,
}) {
  const { localization } = useLocalization();
  const locale = localization.code === "sr" ? "sr-Latn-RS" : "en-GB";

  const datePart = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const formatted = `${datePart}`;
  const handleChange = (event, selectedDate) => {
    setShowDate(false);
    if (event.type === "set" && selectedDate) {
      onDateChange(event, selectedDate);
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDate(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateText}>{formatted || placeholder}</Text>
        </TouchableOpacity>
      </View>

      {showDate && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#838383",
    borderRadius: 15,
  },
  dateText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default DateAbsentComponent;
