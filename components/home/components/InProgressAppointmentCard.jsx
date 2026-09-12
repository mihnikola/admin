import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { convertReadDateTime } from "../../../helpers";
import { ColorsBarber } from "@/constants/Colors";

export default function InProgressAppointmentCard({ data }) {
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
      style={[styles.card, styles.pendingCard]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{user?.name}</Text>
        <View style={[styles.badge, styles.inProgress]}>
          <Text style={styles.badgeText}>{localization.HOME.inProgress}</Text>
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
    backgroundColor: ColorsBarber.light.item,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 15,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: ColorsBarber.light.item,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2d6d6",
  },
  pendingCard: {
    backgroundColor: ColorsBarber.light.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
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
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor,
  },
  datetime: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor,
  },
  location: {
    marginTop: 4,
    fontSize: 13,
    color: "#fff",
  },
  badge: {
    paddingHorizontal: 17,
    paddingVertical: 4,
    borderRadius: 30,
  },
  badgeText: {
    fontSize: 15,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor,
  },
  upcoming: {
    backgroundColor: ColorsBarber.light.background,
  },
  completed: {
    backgroundColor: "#10B981",
  },
  inProgress: {
    backgroundColor: ColorsBarber.light.item,
  },
  cancelled: {
    backgroundColor: "#EF4444",
  },
});
