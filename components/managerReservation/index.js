import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import useManagerReservation from "./hooks/useManagerReservation";
import { SharedLoader } from "@/shared-components/SharedLoader";
import LimitComponent from "./LimitComponent";
import LimitDescription from "./LimitDescription";
import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";

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
    setError,
    error,
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
      style={styles.containerKeyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SharedBackButton
          onPress={router.back}
          absolutePosition={false}
          styleBtn={{ marginTop: 40, marginHorizontal: 15 }}
        />
      <ScrollView contentContainerStyle={styles.container}>
        

        <LimitDescription
          title={localization.SETTINGS.LIMIT.capture}
          subTitle={localization.SETTINGS.LIMIT.subTitle}
          description={localization.SETTINGS.LIMIT.info}
        />
        <LimitComponent
          label={localization.SETTINGS.LIMIT.day}
          icon={
            <MaterialCommunityIcons
              name="weather-sunset-up"
              size={28}
              color={ColorsBarber.light.textColor}
            />
          }
          value={dailyLimit}
          setValue={setDailyLimit}
          onChangeValueLimit={handleNumberInput}
        />
        <LimitComponent
          label={localization.SETTINGS.LIMIT.week}
          icon={
            <Octicons
              name="calendar"
              size={26}
              color={ColorsBarber.light.textColor}
            />
          }
          value={weeklyLimit}
          setValue={setWeeklyLimit}
          onChangeValueLimit={handleNumberInput}
        />
        <LimitComponent
          label={localization.SETTINGS.LIMIT.month}
          icon={
            <MaterialCommunityIcons
              name="progress-clock"
              size={28}
              color={ColorsBarber.light.textColor}
            />
          }
          value={monthlyLimit}
          setValue={setMonthlyLimit}
          onChangeValueLimit={handleNumberInput}
        />
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
          icon={
            <FontAwesome
              name="check-circle-o"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          title={lastResponse}
          onClose={() => setIsMessage(false)}
          onConfirm={refreshHandler}
        />
      )}
      {error?.length > 0 && (
        <SharedMessage
          isOpen={error?.length > 0}
          buttonText="OK"
          icon={
            <FontAwesome
              name="close"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          title={error}
          onClose={() => setError(null)}
          onConfirm={() => setError(null)}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 15,
    backgroundColor: ColorsBarber.light.background,
    justifyContent: "center",
  },
  containerKeyboard: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
});
