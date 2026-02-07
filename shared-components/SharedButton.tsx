import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";


export function SharedButton(props: any) {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {props.loading && <ActivityIndicator size={28} color="white" />}
      {!props.loading &&
        <Text style={[styles.btnText, props.disabled && styles.btnTextDisabled]}>
          {props.text}
        </Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTextDisabled: {
    color: "#3f3f3fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: "grey",
    backgroundColor: "#8b8b8bff",
    color: '#3f3f3fff'
  },
  btn: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
