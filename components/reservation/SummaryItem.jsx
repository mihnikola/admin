import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ColorsBarber } from "@/constants/Colors";

const SummaryItem = ({ data, selectedItem, setSelectedItem }) => {
  const { value } = data;
  const handlerPressDate = (data) => {
    setSelectedItem(data);
  };

  return (
    <TouchableOpacity
      style={[
        styles.content,
        selectedItem?.value === value && styles.selectedContent, // Apply selected style
      ]}
      key={value}
      onPress={() => handlerPressDate(data)}
    >
      <Text
        style={[
          styles.time,
          selectedItem?.value === value && styles.selectedTime, // Apply selected style
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 100,
    height: 50,
    justifyContent: "center",
    borderColor: ColorsBarber.light.inActiveTextColor,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedTime: {
    color: ColorsBarber.light.textColor,
  },
  selectedContent: {
    backgroundColor: ColorsBarber.light.item,
  },
  time: {
    fontSize: 16,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    borderColor: "#ffffff",
  },
});

export default SummaryItem;
