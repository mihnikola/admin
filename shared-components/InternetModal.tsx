import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";

export default function NoInternetModal({ visible }) {
  const { localization } = useLocalization();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <MaterialIcons
            name="signal-wifi-off"
            size={80}
            color="grey"
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.title}> {localization.INTERNET.title}</Text>
          <Text style={styles.sub}> {localization.INTERNET.error}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    padding: 30,
    backgroundColor: "#222224",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  sub: {
    fontSize: 16,
    color: "lightgray",
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
