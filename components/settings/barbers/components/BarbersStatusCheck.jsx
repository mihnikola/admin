import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ColorsBarber } from "@/constants/Colors";

export default function BarbersStatusCheck({ selected, modalHandler, label }) {
  return (
    <TouchableOpacity onPress={modalHandler} style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome
          name="calendar"
          size={20}
          color={ColorsBarber.light.textColor}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>

        <Text
          style={[
            styles.value,
            { color: selected ? ColorsBarber.light.textColor :  ColorsBarber.light.inActiveTextColor },
          ]}
        >
          {selected || ""}
        </Text>
      </View>

      <Feather
        name="chevron-right"
        size={20}
        color={ColorsBarber.light.textColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorsBarber.light.item,

    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  icon: {
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    color: ColorsBarber.light.textColor,
    fontSize: 12,
    marginBottom: 2,
  },

  value: {
    fontSize: 16,
  },
});
