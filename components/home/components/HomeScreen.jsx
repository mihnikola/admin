import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeCoverImage from "./HomeCoverImage";
import UpcomingAppointmentCard from "./UpcomingAppointmentCard";
import InProgressAppointmentCard from "./InProgressAppointmentCard";
import UpcomingAbsenceCard from "./UpcomingAbsenceCard";

import { useHomeData } from "@/contexts/HomeDataContext";
import HomeLoader from "@/shared-components/HomeLoader";

export default function HomeScreen() {
  const {
    upcomingData,
    inProgressData,
    requirementsLength,
    requirements,
    isLoading: isLoadingHome,
    error,
    fetchHomeInfo,
    absenceData,
  } = useHomeData();

  useFocusEffect(
    useCallback(() => {
      fetchHomeInfo();
    }, []),
  );

  const { company, isLoading } = useCompany();
  const { localization } = useLocalization();

  const calendarHandler = () => {
    router.push("/(tabs)/(01_home)/calendar");
  };
  const locationHandler = () => {
    router.push("/(tabs)/(01_home)/locations");
  };
  const requirementsHandler = () => {
    router.push("/(tabs)/(01_home)/requirements");
  };

  const absenceHandler = () => {
    router.push("/(tabs)/(01_home)/absence");

  }

  if (company) {
    return (
      <View style={styles.container}>
        <HomeCoverImage image={company?.media?.coverImageHome} />
        {isLoadingHome === "getHomeInfo" && <HomeLoader />}
        {isLoadingHome !== "getHomeInfo" && (
          <View style={styles.boxBook}>
            {upcomingData && <UpcomingAppointmentCard data={upcomingData} />}
            {inProgressData && (
              <InProgressAppointmentCard data={inProgressData} />
            )}
            {/* <UpcomingAbsenceCard data={inProgressData} /> */}

            <View style={styles.containerData}>
              <TouchableOpacity
                onPress={calendarHandler}
                style={styles.btnLocationContent}
              >
                <FontAwesome name="calendar" size={20} color="white" />

                <View style={styles.locationContent}>
                  <Text style={styles.titleLocation}>
                    {localization.HOME.calendar}
                  </Text>
                </View>

                <FontAwesome name="chevron-right" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={requirementsHandler}
                style={styles.btnLocationContent}
              >
                <FontAwesome name="paper-plane" size={22} color="white" />

                <View style={styles.locationContent}>
                  <Text style={styles.titleLocation}>
                    {localization.HOME.requirements}
                  </Text>
                </View>
                {requirementsLength > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{requirementsLength}</Text>
                  </View>
                )}
                <FontAwesome name="chevron-right" size={28} color="white" />
              </TouchableOpacity>
              {absenceData?.length > 0 && (
                <TouchableOpacity
                  onPress={absenceHandler}
                  style={styles.btnLocationContent}
                >
                  <Ionicons name="swap-vertical" size={24} color="#fff" />
                  <View style={styles.locationContent}>
                    <Text style={styles.titleLocation}>
                      {localization.HOME.absenceManager}
                    </Text>
                  </View>

                  <FontAwesome name="chevron-right" size={28} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerData: {
    margin: 15,
  },
  box: {
    width: 400,
    height: 400,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 100,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    position: "absolute",
    left: 35,
    top: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  boxBook: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },

  locationContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  btnLocationContent: {
    width: "100%",
    backgroundColor: "#222224",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
  },

  address: {
    fontSize: 15,
    color: "grey",
  },
  titleLocation: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },

  btnContent: {
    width: 300,
    backgroundColor: "#222224",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 15,
  },
});
