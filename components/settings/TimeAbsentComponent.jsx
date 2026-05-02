import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TimeAbsentComponent({
  setShowFromPicker,
  label,
  time,
  placeholder,
}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowFromPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>{label}</Text>

        <Text style={styles.dateText}>{time || placeholder}</Text>

        <FontAwesome name="calendar-o" size={18} color="#aaa" />
      </TouchableOpacity>
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

export default TimeAbsentComponent;
