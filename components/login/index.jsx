import { useAuth } from "@/contexts/AuthContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedInput } from "@/shared-components/SharedInput";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedPassword } from "@/shared-components/SharedPassword";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import useEmail from "./../../components/login/hooks/useEmail";
import usePassword from "./../../components/login/hooks/usePassword";

export default function LoginScreen() {
  const { isLoading, isMessage, setIsMessage, loginAdmin, error, success } = useAuth();
  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange } = usePassword();

  const handleLogin = () => {
    loginAdmin(email, password);
  };
  const confirmHandler = () => {
    setIsMessage(false);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/(01_home)");
    }
  };
  const cancelHandler = () => {
    setIsMessage(false);
  };
  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.captureContainer}>
          <Text style={styles.mainTitle}>Lets get you Login!</Text>
          <Text style={styles.subtitle}>Enter your information below</Text>
        </View>
        <View style={styles.inputContainer}>
          <SharedInput
            label="Email Address"
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <SharedPassword
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter your password"
          />
          <SharedButton
            loading={isLoading}
            onPress={handleLogin}
            text="Login"
          />
        </View>
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : cancelHandler}
            onConfirm={!error ? confirmHandler : cancelHandler}
            isLoading={isLoading}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color="white"
              />
            }
            title={error || success}
            buttonText={"OK"}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "black",
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 250,
    resizeMode: "contain",
    backgroundColor: "black",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
    height: 220,
  },
  captureContainer: {
    alignItems: "center",
  },

  input: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
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
    width: "80%",
  },
  inputContainer: {
    marginHorizontal: 10
  }
});
