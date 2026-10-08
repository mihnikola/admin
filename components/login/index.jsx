import { useAuth } from "@/contexts/AuthContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedInput } from "@/shared-components/SharedInput";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedPassword } from "@/shared-components/SharedPassword";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useEmail from "./../../components/login/hooks/useEmail";
import usePassword from "./../../components/login/hooks/usePassword";
import { useRef } from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";
import ForgotPasswordLink from "./ForgotPasswordLink";

export default function LoginScreen() {
  const { localization } = useLocalization();
  const {
    loadingLogin,
    isMessage,
    setIsMessage,
    loginAdmin,
    error,
    success,
    confirmHandler,
  } = useAuth();
  const { email, handleEmailChange, emailError } = useEmail();
  const { password, handlePasswordChange } = usePassword();

  const handleLogin = () => {
    loginAdmin(email, password);
  };

  const cancelHandler = () => {
    setIsMessage(false);
  };

  const forgotPassHandler = () => {
    router.push("/(z_auth)/forgotPass");
  };

  const passwordInputRef = useRef();
  const passwordLayout = useRef(0);

  return (
    <ScrollView
      style={styles.safeArea}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require("@/assets/images/admin.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.captureContainer}>
          <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
          <Text style={styles.subtitle}>{localization.LOGIN.description}</Text>
        </View>
        <View>
          <SharedInput
            label={localization.EMAIL.label}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            onSubmitEditing={() => passwordInputRef.current.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={emailError}
            returnKeyType="next"
          />
          <View
            onLayout={(e) => {
              passwordLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <SharedPassword
              label={localization.PASSWORD.label}
              value={password}
              ref={passwordInputRef}
              onChangeText={handlePasswordChange}
              placeholder={localization.PASSWORD.placeholder}
            />
          </View>
          <ForgotPasswordLink
            onPress={forgotPassHandler}
            title={localization.LOGIN.forgot}
          />
          <View>
            <SharedButton
              loading={loadingLogin === "login"}
              onPress={handleLogin}
              text={localization.LOGIN.submitBtn}
            />
          </View>
        </View>
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : cancelHandler}
            onConfirm={!error ? confirmHandler : cancelHandler}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color={ColorsBarber.dark.textColor}
              />
            }
            title={error || success}
            buttonText="OK"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
  container: {
    alignItems: "center",
    maxWidth: 400,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: 250,
    resizeMode: "contain",
    backgroundColor: ColorsBarber.dark.background,
  },
  captureContainer: {
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor,
  },
  subtitle: {
    fontSize: 13,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  input: {
    backgroundColor: ColorsBarber.dark.inputField,
    color: ColorsBarber.dark.textColorInput,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "OldStandard-Regular",
  },
});
