import { ComponentType } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function withKeyboardAvoid<T>(
  WrapperComponent: ComponentType<T>,
) {
  return function (props: T & JSX.IntrinsicAttributes) {
    // const insets = useSafeAreaInsets();

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.safeArea}
        keyboardVerticalOffset={10}
      >
        <WrapperComponent {...props} />
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
});
