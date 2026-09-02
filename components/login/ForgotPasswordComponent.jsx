import { View, Text, StyleSheet } from "react-native";
import useEmail from "./hooks/useEmail";
import { useLocalization } from "@/contexts/LocalizationContext";
import useEmailOtpCode from "./hooks/useEmailOtpCode";
import WrapperAuth from "./../../wrapper/WrapperAuth";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { SharedInput } from "@/shared-components/SharedInput";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const ForgotPasswordComponent = () => {
  const { email, emailError, handleEmailChange } = useEmail();

  const { localization } = useLocalization();

  const { checkEmailValidation, error, setError, isLoading } =
    useEmailOtpCode();

  const navHandler = () => {
    checkEmailValidation(email);
  };

  const confirmHandler2 = () => {
    setError(null);
  };
  console.log("xxxxxxxxxxxx", error);
  return (
    <WrapperAuth>
      <SharedBackButton
        onPress={router.back}
        absolutePosition={false}
        styleBtn={{ marginBottom: 30 }}
      />

      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.mainTitle}>
            {localization.FORGOT_PASSWORD.title}
          </Text>

          <Text style={styles.subtitle}>
            {localization.FORGOT_PASSWORD.subtitle}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <SharedInput
            label={localization.EMAIL.label}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={emailError}
          />
        </View>
      </View>

      <View>
        <SharedButton
          disabled={emailError.length > 0 && email.length > 0}
          onPress={navHandler}
          loading={isLoading}
          text={localization.FORGOT_PASSWORD.submitBtn}
        />
      </View>

      {Boolean(error) && (
        <SharedMessage
          isOpen={error?.length > 0 ? true : false}
          onClose={confirmHandler2}
          onConfirm={confirmHandler2}
          icon={
            <FontAwesome
              name={error?.length && "close"}
              size={64}
              color="white"
            />
          }
          title={error}
          buttonText={localization.OK.label}
        />
      )}
    </WrapperAuth>
  );
};
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginHorizontal: 10,
  },
  radiobtn: {
    flex: 2,
    flexDirection: "column",
    gap: 25,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  image: {
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
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
export default ForgotPasswordComponent;
