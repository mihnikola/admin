import { getSettingsOptions } from "@/helpers/getSettingsOptions";
import { router } from "expo-router";
import {
  ActivityIndicator,
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
import { useEffect, useState } from "react";
import SettingsItem from "../../SettingsItem";
import { getInitialsName } from "@/helpers";
import { ColorsBarber } from "@/constants/Colors";

export default function SettingsComponent() {
  const { localization } = useLocalization();

  const settingsOptions = getSettingsOptions(localization);
  const { logoutFirebase, isLoading, fetchUserData, userData } = useAuth();
  const [isImageLoading, setIsImageLoading] = useState(!!userData?.image);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (userData?.image) setIsImageLoading(false);
  // }, [userData?.image]);

  console.log("isLoading", isLoading);


  console.log("isImageLoading", isImageLoading);

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
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        {isLoading === "fetchUserData" && (
          <ActivityIndicator size="large" color={ColorsBarber.dark.textColor} />
        )}

        {!isLoading && userData?.image  && (
          <TouchableOpacity
            style={styles.defaultImgAvatar}
            onPress={editProfileBarber}
            activeOpacity={0.8}
          >
            
            <Image
              source={{ uri: userData.image }}
              style={styles.image}
              onLoadStart={() => setIsImageLoading(true)} // Pokreće loader čim dekoder krene
              onLoadEnd={() => setIsImageLoading(false)} // Gaasi loader čim se slika nacrta na ekranu
              onError={() => setIsImageLoading(false)} // Sprečava zaglavljivanje ako je URL nevažeći
            />
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color={ColorsBarber.dark.textColor}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        {!isLoading && initials && !userData?.image && (
          <TouchableOpacity
            style={styles.initialContainer}
            onPress={editProfileBarber}
            activeOpacity={0.8}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarTextInitials}>{initials}</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color={ColorsBarber.dark.textColor}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {!isLoading  && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.avatarText}>{userData?.name}</Text>
          </View>
        )}
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
  imageLoaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Blago zatamnjenje dok učitava
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderRadius: 50, // Prilagodi u zavisnosti od oblinosti tvog avatara
  },
  avatarContainer: {
    padding: 35,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.background,
  },

  defaultImgAvatar: {
    alignSelf: "center",
    alignContent: "baseline",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: ColorsBarber.dark.background,
    borderRadius: 100,
  },
  initialContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "flex-end",
    backgroundColor: ColorsBarber.dark.item,
    borderRadius: 50,
  },
  editButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    alignContent: "flex-end",
  },
  editButton: {
    backgroundColor: ColorsBarber.dark.item,
    borderRadius: 20,
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
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
    opacity: 0.3,
    position: "absolute",
  },
  avatarText: {
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
    fontSize: 23,
    letterSpacing: 2,
  },
  avatarTextInitials: {
    fontSize: 32,
    letterSpacing: 2,
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.dark.textColor,
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
