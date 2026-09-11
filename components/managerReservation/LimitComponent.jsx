import { ColorsBarber } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
const THEME = {
  background: "#121212", // Charcoal
  accentTeal: "#4FD1C5", // Light Teal
  accentPurple: "#7B61FF", // Deep Purple
  textPrimary: "#FFFFFF",
  textSecondary: "#A0AEC0",
  inputBackground: "#1A1A1A",
  inputBorder: "#74737a",
};
const LimitComponent = ({
  label,
  icon,
  value,
  setValue,
  onChangeValueLimit,
}) => {
  const increment = () => {
    setValue((prev) => {
      const currentValue = parseInt(prev) || 0;
      return (currentValue + 1).toString();
    });
  };

  const decrement = () => {
    setValue((prev) => {
      const currentValue = parseInt(prev) || 0;
      const newValue = Math.max(0, currentValue - 1);
      return newValue.toString();
    });
  };
  return (
    <View style={styles.limitContainer}>
      <Text style={styles.limitLabel}>{label}</Text>
      <View style={styles.stepperWrapper}>
        <View style={styles.iconAndValueWrapper}>
          <View style={styles.iconContainer}>{icon}</View>
          <View style={styles.valueTextWrapper}>
            <TextInput
              style={styles.valueText}
              keyboardType="number-pad"
              value={String(value ?? "")}
              onChangeText={onChangeValueLimit(setValue, 4)}
            />
          </View>
        </View>

        <View style={styles.stepperButtons}>
          <TouchableOpacity onPress={decrement} style={styles.stepperButton}>
            <Ionicons
              name="remove"
              size={20}
              color={ColorsBarber.light.textColor}
            />
          </TouchableOpacity>
          <View style={styles.stepperSeparator} />
          <TouchableOpacity onPress={increment} style={styles.stepperButton}>
            <Ionicons
              name="add"
              size={20}
              color={ColorsBarber.light.textColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  limitContainer: {
    marginBottom: 20,
  },
  limitLabel: {
    fontSize: 14,
    color: ColorsBarber.light.textColor,
    marginBottom: 8,
    fontWeight: "500",
  },
  stepperWrapper: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.light.background,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 64,
  },
  iconAndValueWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 84,
  },

  valueText: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    fontWeight: "700",
    letterSpacing: 0.5,
    paddingRight: 50,
  },

  stepperButtons: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ColorsBarber.light.textColor,
    borderRadius: 8,
    backgroundColor: ColorsBarber.light.background,
  },
  stepperButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperSeparator: {
    width: 1,
    height: 20,
    backgroundColor: ColorsBarber.light.textColor,
  },
});

export default LimitComponent;
