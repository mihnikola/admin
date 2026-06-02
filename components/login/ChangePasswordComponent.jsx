import { useLocalization } from "@/contexts/LocalizationContext";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, findNodeHandle, ScrollView, Platform } from "react-native";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import WrapperAuth from "@/wrapper/WrapperAuth";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { SharedPassword } from "@/shared-components/SharedPassword";
import SharedConfirmPassword from "@/shared-components/SharedConfirmPassword";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import { useRef } from "react";

const ChangePasswordComponent = () => {
  const { data, email, changeProfile } = useLocalSearchParams();

  const { localization } = useLocalization();
  const { password, passwordError, handlePasswordChange, passwordInputRef } =
    usePassword();
  const {
    password: passwordCurrent,
    passwordError: passworCurrentError,
    handlePasswordChange: handleCurrentPassword,
    passwordInputRef: passwordCurrentRef,
  } = usePassword();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    passwordConfirmInputRef,
  } = useConfirmPassword(password);

  const scrollRef = useRef();
  const {
    handlePatchUser,
    message,
    isMessage,
    setIsMessage,
    error,
    isLoading,
    changePasswordHandler,
  } = useChangePasswordHandler();

  const submitChanges = () => {
    if (changeProfile === "1") {
      changePasswordHandler(email, passwordCurrent, password, confirmPassword);
      return;
    }
    if (passwordError?.length === 0)
      handlePatchUser(data, password, confirmPassword);
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    await removeOtpParamsStorage();
    // router.dismissAll();
    // router.replace("/(z_auth)/login");
    router.back();
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        {/* <WrapperAuth> */}
        <SharedBackButton
          onPress={router.back}
          absolutePosition={false}
          styleBtn={{ marginBottom: 30 }}
        />
        <View style={{ width: "100%" }}>
          <View>
            <Text style={styles.mainTitle}>
              {localization.CHANGE_PASS.mainTitle}
            </Text>
          </View>

          <View style={styles.textinputContainer}>
            {changeProfile === "1" && (
              <SharedPassword
                label={localization.PASSWORD.currentLabel}
                value={passwordCurrent}
                onChangeText={handleCurrentPassword}
                placeholder={localization.PASSWORD.placeholder}
                returnKeyType="next"
                onSubmitEditing={() => {
                  const node = findNodeHandle(passwordCurrentRef.current);
                  if (node) {
                    scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                      node,
                      80,
                      true,
                    );
                  }
                  passwordInputRef.current?.focus();
                }}
              />
            )}
            <SharedPassword
              label={localization.PASSWORD.newLabel}
              value={password}
              ref={passwordInputRef}
              onChangeText={handlePasswordChange}
              placeholder={localization.PASSWORD.placeholder}
              error={passwordError}
              returnKeyType="next"
              onSubmitEditing={() => {
                const node = findNodeHandle(passwordInputRef.current);
                if (node) {
                  scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                    node,
                    80,
                    true,
                  );
                }

                passwordConfirmInputRef.current?.focus();
              }}
            />

            <SharedConfirmPassword
              label={localization.CONFIRM_PASSWORD.label}
              value={confirmPassword}
              ref={passwordConfirmInputRef}
              onChangeText={handleConfirmPasswordChange}
              placeholder={localization.CONFIRM_PASSWORD.placeholder}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.btnFooter}>
        <SharedButton
          loading={isLoading}
          text={localization.SUBMIT.label}
          disabled={password.length > 0 && passwordError.length > 0}
          onPress={submitChanges}
        />
      </View>
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onClose={!error ? confirmHandler : confirmHandler2}
          onConfirm={!error ? confirmHandler : confirmHandler2}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={error || message}
          buttonText={localization.OK.label}
        />
      )}
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: "#000",
  },
  passContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
  },
  passwordInput: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  textinputContainer: {
    gap: 10,
  },
  btnFooter: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  icon: {
    paddingHorizontal: 8,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },


  image: {
    resizeMode: "cover",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
export default withKeyboardAvoid(ChangePasswordComponent);
