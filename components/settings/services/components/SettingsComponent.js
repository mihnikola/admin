import { getSettingsOptions } from "@/helpers/getSettingsOptions";
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
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useEffect, useState } from "react";
import SettingsItem from "../../SettingsItem";
import { getInitialsName } from "@/helpers";
import { ColorsBarber } from "@/constants/Colors";

export default function SettingsComponent() {
  const { localization } = useLocalization();

  const settingsOptions = getSettingsOptions(localization);
  const { logoutFirebase, isLoading, fetchUserData, userData } = useAuth();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      await fetchUserData();
    }, 500);
  }, []);

  const handlePress = (route) => {
    if (route === "logout") {
      setIsLogout(true);
      return;
    }
    if (route) router.push(route);
  };
  const logoutCancelHandler = () => {
    setIsLogout(false);
  };
  const logoutConfirmHandler = () => {
    setIsLogout(false);

    logoutFirebase();
  };
  const editProfileBarber = () => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addBarbers",
      params: { id: userData?.id, changeProfile: 1 },
    });
  };

  const initials = getInitialsName(userData?.name);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/frizerskiSalon1.png")}
          style={styles.coverImage}
        />
        {userData?.image ? (
          <TouchableOpacity
            style={styles.defaultImgAvatar}
            onPress={editProfileBarber}
          >
            <Image source={{ uri: userData?.image }} style={styles.image} />
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color={ColorsBarber.light.textColor}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.initialContainer}
            onPress={editProfileBarber}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarTextInitials}>{initials}</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color={ColorsBarber.light.textColor}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.avatarText}>{userData?.name}</Text>
        </View>
      </View>

      {/* 2. SEKCIJA: Lista koja se skroluje */}
      <View style={styles.listWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {settingsOptions.map((item) => (
            <SettingsItem
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => handlePress(item.route)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Modali i Loaderi */}
      {isLogout && (
        <SharedQuestion
          isOpen={isLogout}
          onClose={logoutCancelHandler}
          onLogOut={logoutConfirmHandler}
          icon={
            <FontAwesome
              name="question-circle-o"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          title={localization.SETTINGS.LOGOUT.question}
          buttonTextYes={localization.SETTINGS.LOGOUT.title}
          buttonTextNo={localization.SETTINGS.LOGOUT.cancel}
        />
      )}
      {isLoading && <SharedLoader isOpen={isLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 35,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ColorsBarber.light.background,
  },

  defaultImgAvatar: {
    alignSelf: "center",
    alignContent: "baseline",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: ColorsBarber.light.background,
    borderRadius: 100,
  },
  initialContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  editButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    alignContent: "flex-end",
  },
  editButton: {
    backgroundColor: ColorsBarber.light.background,
    borderRadius: 20,
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
    // marginBottom:20
    paddingBottom: 20,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    resizeMode: "cover",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
    position: "absolute",
  },
  avatarText: {
    color: ColorsBarber.light.textColor,
    fontWeight: "700",
    fontSize: 23,
    letterSpacing: 2,
  },
  avatarTextInitials: {
    fontSize: 32,
    letterSpacing: 2,
    fontWeight: "700",
    color: ColorsBarber.light.textColor,
  },
  imageContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  listWrapper: {
    flex: 1,
  },
  scrollContent: {
    // paddingHorizontal: 12,
    marginHorizontal: 6,
    marginVertical: 8,
  },
});
