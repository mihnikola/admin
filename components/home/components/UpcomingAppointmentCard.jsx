import { convertReadDateTime } from "@/helpers";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

export default function UpcomingAppointmentCard({ data }) {
  const { user, service, place, startDate, endDate, arrived } = data;

  const { localization } = useLocalization();
  const goToScreen = () => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: data?._id,
        user: data?.user?.name,
        note: data?.description,
        arrived: data?.arrived,
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={goToScreen}
      style={[styles.card, styles.upcomingCard]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{user?.name}</Text>
        <View style={[styles.badge, styles.upcoming]}>
          <Text style={styles.badgeText}>{localization.HOME.upcoming}</Text>
        </View>
      </View>

      <Text style={styles.datetime}>
        {convertReadDateTime(startDate, endDate)}
      </Text>

      {/* {place?.address && <Text style={styles.location}>{place?.address}</Text>} */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorsBarber.dark.textColor,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: ColorsBarber.dark.backgroundModal,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
  },
  pendingCard: {
    backgroundColor: ColorsBarber.dark.textColor,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
  },
  upcomingBadge: {
    backgroundColor: "#111111",
  },
  pendingBadge: {
    backgroundColor: "#6B7280",
  },
  badgeBase: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },



  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  
  datetime: {
    marginTop: 8,
    fontSize: 14,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  location: {
    marginTop: 4,
    fontSize: 13,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  badge: {
    paddingHorizontal: 17,
    paddingVertical: 4,
    borderRadius: 30,
  },
  badgeText: {
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor,
    textTransform: "capitalize",
  },
  upcoming: {
    backgroundColor: ColorsBarber.dark.item,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  completed: {
    backgroundColor: ColorsBarber.dark.textColor,
  },
  inProgress: {
    backgroundColor: ColorsBarber.dark.textColor,
  },
  cancelled: {
    backgroundColor: "#EF4444",
  },
});
