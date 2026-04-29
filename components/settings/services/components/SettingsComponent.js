import { getSettingsOptions } from "@/helpers/getSettingsOptions";
import SharedCarousel from "@/shared-components/SharedCarousel";
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
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useEffect, useState } from "react";
import SettingsItem from "../../SettingsItem";
import useBarbers from "../../barbers/hooks/useBarbers";
import { getInitialsName } from "@/helpers";

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
  console.log("userData", userData)
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
  console.log("initials", initials)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* <SharedCarousel  /> */}

      {/* 1. SEKCIJA: Slika (Header) */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        {userData?.image ?
          <TouchableOpacity
            style={styles.defaultImgAvatar}
            onPress={editProfileBarber}
          >
            <Image source={{ uri: userData?.image }} style={styles.image} />
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons name="pencil" size={25} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          :

          <TouchableOpacity
            style={styles.initialContainer}
            onPress={editProfileBarber}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <MaterialCommunityIcons name="pencil" size={12} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
        }

        <Text style={styles.avatarText}>{userData?.name}</Text>

        {/* <Ionicons name="person-circle-sharp" size={170} color="black" /> */}
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
            <FontAwesome name="question-circle-o" size={64} color="white" />
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
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 50,
  },
  avatarText: {
    color: "#fff",
    fontSize: 30,
  },
  defaultImgAvatar: {
    alignSelf: "baseline",
    alignContent: "baseline",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 6,
  },
  initialContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 1,
  },
  editButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    alignItems: "flex-start",
  },
  editButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    opacity: 0.2,
    position: "absolute",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: 2,
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
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
});
