
import { getSettingsOptions } from "@/helpers/getSettingsOptions";
import SharedCarousel from "@/shared-components/SharedCarousel";
import { router } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useState } from "react";
import SettingsItem from "../../SettingsItem";

export default function SettingsComponent() {
  const { localization } = useLocalization();

  const settingsOptions = getSettingsOptions(localization);
  const { logoutFirebase, isLoading } = useAuth();
  const [isLogout, setIsLogout] = useState(false);

  const handlePress = (route) => {
    if (route === 'logout') {
      setIsLogout(true);
      return;
    }
    if (route) router.push(route);
  };
  const logoutCancelHandler = () => {
    setIsLogout(false);
  }
  const logoutConfirmHandler = () => {
    logoutFirebase();
    setIsLogout(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SharedCarousel title={localization.TABS.SETTINGS} />

      <ScrollView contentContainerStyle={styles.list}>
        {settingsOptions.map((item) => (
          <SettingsItem
            key={item.id}
            id={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => handlePress(item.route)}
          />
        ))}
      </ScrollView>
      {isLogout && (
        <SharedQuestion
          isOpen={isLogout}
          onClose={logoutCancelHandler}
          onLogOut={logoutConfirmHandler}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.SERVICES.question}
          buttonTextYes={localization.SERVICES.confirmButton}
          buttonTextNo={localization.SERVICES.cancel}
        />
      )}

      {isLoading && <SharedLoader isOpen={isLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 40,
  },
  list: {
    paddingVertical: 16,
  },
});
