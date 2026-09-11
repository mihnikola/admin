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
        <ActivityIndicator size={24} color={ColorsBarber.light.textColor} />
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
    color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: "grey",
    backgroundColor: ColorsBarber.light.background,
  },
  btnTextDisabled: {
    color: "rgb(32, 32, 32)",
    fontSize: 18,
    fontWeight: "bold",
  },

  btn: {
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.light.textColor,
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
