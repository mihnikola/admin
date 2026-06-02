import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

function WrapperAuth({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          flex: 1,
          paddingVertical: 20,
          backgroundColor: "black",
        }}
        keyboardShouldPersistTaps="always"
      >
        {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
});

export default WrapperAuth;