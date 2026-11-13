import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import React from "react";
import { StyleSheet, Text } from "react-native";

function ForgotPasswordLink({ onPress, title }) {
  return (
    <TouchableOpacity style={styles.forgotPassContainer} onPress={onPress}>
      <Text style={styles.forgotPassText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  forgotPassContainer: {
    marginVertical: 20,
    alignItems: "flex-end",
  },
  forgotPassText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Italic",
    textDecorationLine: "underline",
    paddingHorizontal: 10,
  },
});

export default ForgotPasswordLink;
