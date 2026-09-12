import { ColorsBarber } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function TimeAbsentComponent({ setShowFromPicker, time, placeholder }) {
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
    backgroundColor: ColorsBarber.light.item,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    borderRadius: 15,
        fontFamily: "OldStandard-Regular",

  },

  dateText: {
    fontSize: 14,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Regular",
  },
});

export default TimeAbsentComponent;
