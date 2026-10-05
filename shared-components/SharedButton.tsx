import { ColorsBarber } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function SharedButton(props: any) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        props.margin && styles.noMargin,
        props.disabled && styles.btnDisabled,
      ]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {props.loading && (
        <ActivityIndicator size={24} color={ColorsBarber.dark.textColor} />
      )}
      {!props.loading && (
        <Text
          style={[styles.btnText, props.disabled && styles.btnTextDisabled]}
        >
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Regular", // Ključ iz useFonts
  },
  btnDisabled: {
    borderColor: ColorsBarber.dark.inActiveTextColor,
    backgroundColor: ColorsBarber.dark.btnBgColorDisabled,
  },
  btnTextDisabled: {
    color: ColorsBarber.dark.inActiveTextColor,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "OldStandard-Bold",

  },

  btn: {
    backgroundColor: ColorsBarber.dark.btnBgColor,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.textColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    minHeight: 50,
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
});
