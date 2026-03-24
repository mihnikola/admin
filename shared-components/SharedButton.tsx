import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";


export function SharedButton(props: any) {
  return (
    <TouchableOpacity
      style={[styles.btn, props.margin && styles.noMargin, props.disabled && styles.btnDisabled]}
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

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: "grey",
    backgroundColor: "rgb(82, 81, 81)",
  },
  btnTextDisabled: {
    color: "rgb(32, 32, 32)",
    fontSize: 18,
    fontWeight: "bold",
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
  noMargin: {
    marginTop: 0,
    marginBottom: 10,
  }
});

