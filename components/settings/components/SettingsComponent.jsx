import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { ColorsBarber } from "@/constants/Colors";
import SettingsList from "./SettingsList";
import SettingsImageComponent from "./SettingsImageComponent";
import SettingsAvatarComponent from "./SettingsAvatarComponent";
import SettingsAvatarTextComponent from "./SettingsAvatarTextComponent";
import SettingsBackgroundImageComponent from "./SettingsBackgroundImageComponent";
import useSettings from '../hooks/useSettings';

export default function SettingsComponent() {
  const { localization, isLogout, settingsOptions, fetchUserData, initials, editProfileBarber, logoutConfirmHandler, logoutCancelHandler, handlePress, isLoading, userData, setIsImageLoading } = useSettings();
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.imageContainer}>
        <SettingsBackgroundImageComponent />
        {isLoading === "fetchUserData" && (
          <ActivityIndicator size="large" color={ColorsBarber.dark.textColor} />
        )}
        {!isLoading && userData?.image && (
          <SettingsImageComponent setIsImageLoading={setIsImageLoading} editProfileBarber={editProfileBarber} image={userData?.image} />
        )}
        {!isLoading && initials && !userData?.image && (
          <SettingsAvatarComponent editProfileBarber={editProfileBarber} initials={initials} />
        )}
        {!isLoading && (
          <SettingsAvatarTextComponent name={userData?.name} />
        )}
      </View>

      <SettingsList settingsOptions={settingsOptions} handlePress={handlePress} />

      {isLogout && (
        <SharedQuestion
          isOpen={isLogout}
          onClose={logoutCancelHandler}
          onLogOut={logoutConfirmHandler}
          icon={
            <FontAwesome
              name="question-circle-o"
              size={64}
              color={ColorsBarber.dark.textColor}
            />
          }
          title={localization.SETTINGS.LOGOUT.question}
          buttonTextYes={localization.SETTINGS.LOGOUT.title}
          buttonTextNo={localization.SETTINGS.LOGOUT.cancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
    paddingBottom: 20,
  },
  imageContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },

});
