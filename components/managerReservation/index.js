import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useManagerReservation from "./hooks/useManagerReservation";
import { SharedLoader } from "@/shared-components/SharedLoader";

export default function ManagerReservation() {
  const { localization } = useLocalization();
  const {
    isLoading,
    submitHandler,
    refreshHandler,
    isMessage,
    lastResponse,
    setIsMessage,
    dailyLimit,
    setDailyLimit,
    weeklyLimit,
    setWeeklyLimit,
    monthlyLimit,
    setMonthlyLimit,
  } = useManagerReservation();

  if (isLoading === "get") {
    return <SharedLoader isOpen={isLoading === "get"} />;
  }

  const handleNumberInput =
    (setValue, maxLength = 4) =>
    (text) => {
      const cleaned = text.replace(/\D/g, "").slice(0, maxLength);
      setValue(cleaned);
    };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>
            {localization.SETTINGS.LIMIT.capture}
          </Text>
        </View>
        <View>
          <Text style={styles.subTitle}>
            {localization.SETTINGS.LIMIT.subTitle}
          </Text>
        </View>
        <Text style={styles.limitsTitle}>
          {localization.SETTINGS.LIMIT.info}
        </Text>
        <View>
          <Text style={styles.limitsTitleDay}>
            {localization.SETTINGS.LIMIT.day}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={localization.SETTINGS.LIMIT.day}
            keyboardType="number-pad"
            value={String(dailyLimit ?? "")}
            onChangeText={handleNumberInput(setDailyLimit, 4)}
          />
        </View>

        <View>
          <Text style={styles.limitsTitleDay}>
            {localization.SETTINGS.LIMIT.week}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={localization.SETTINGS.LIMIT.week}
            keyboardType="number-pad"
            value={String(weeklyLimit ?? "")}
            onChangeText={handleNumberInput(setWeeklyLimit, 4)}
          />
        </View>

        <View>
          <Text style={styles.limitsTitleDay}>
            {localization.SETTINGS.LIMIT.month}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={localization.SETTINGS.LIMIT.month}
            keyboardType="number-pad"
            value={String(monthlyLimit ?? "")}
            onChangeText={handleNumberInput(setMonthlyLimit, 4)}
          />
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <SharedButton
          loading={isLoading === "put"}
          onPress={submitHandler}
          text={localization.SETTINGS.LIMIT.submit}
        />
      </View>
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          buttonText="OK"
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          title={lastResponse}
          onClose={() => setIsMessage(false)}
          onConfirm={refreshHandler}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  limitsTitleDay: {
    color: "white",
    fontSize: 16,
  },
  limitsDisplay: {
    gap: 15,
    backgroundColor: "#010101",
    borderRadius: 8,
  },
  limitsTitle: {
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    fontSize: 19,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    lineHeight: 23,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    color: "#ddd8d8",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
