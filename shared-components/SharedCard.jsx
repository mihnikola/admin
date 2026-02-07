import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SharedCard = ({ item }) => {
  const { localization } = useLocalization();

  console.log("itemxxx", item);
  const goToScreen = (item) => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: item?.id,
        user: item?.reservation?.user,
        note: item?.reservation?.note,
        arrived: item?.arrived
      },
    });
  };

  return (
    <TouchableOpacity
      key={item._id}
      style={styles.eventItem}
      onPress={() => goToScreen(item)}
    >
      <View style={styles.timeBlock}>
        <Text style={styles.startTime}>{item.startTime}</Text>
      </View>
      <View style={styles.detailsBlock}>
        <Text style={styles.eventTitle}>
          {localization.code === "en" ? item.name.nameEn : item.name.nameLocal}
        </Text>
        <Text style={styles.eventUser}>
          {item.reservation.user
            ? item.reservation.user
            : localization.code === "en"
              ? "unknown user"
              : "nepoznati korisnik"}
        </Text>
        {item.arrived === "arrived" ? (
          <Text style={styles.eventStatus}>
            {item.status === "pending" && localization.STATUS.pending}
            {item.status === "approved" && localization.STATUS.approved}
            {item.status === "rejected" && localization.STATUS.rejected}
          </Text>
        ) : (
          <Text style={styles.eventStatus}>
            {item.arrived === "missed" && localization.STATUS.missed}
          </Text>
        )}
      </View>
      {item.arrived === "arrived" && (
        <View style={styles.status}>
          {item.status === "pending" && (
            <FontAwesome size={25} color="white" name="clock-o" />
          )}
          {item.status === "approved" && (
            <FontAwesome size={25} color="white" name="check-circle-o" />
          )}
          {item.status === "rejected" && (
            <FontAwesome size={25} color="white" name="close" />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  status: {
    alignSelf: "baseline",
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#262626ff",
    borderRadius: 10,
    padding: 15,
    margin: 8,
    shadowColor: "#262626ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  timeBlock: {
    width: 70, // Fixed width for time block
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingRight: 15,
  },
  startTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e2e2e2ff",
  },
  detailsBlock: {
    flex: 1, // Take remaining space
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#edededff",
    marginBottom: 5,
  },
  eventUser: {
    fontSize: 14,
    fontWeight: "500",
    color: "#edededff",
    marginBottom: 5,
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
});

export default SharedCard;
