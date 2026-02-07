import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateFormatComponent from "./DateFormatComponent";
const RequirementComponentItem = ({ item }) => {
  const { localization } = useLocalization();

  console.log("object",item)
  const goToScreen = (item) => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: item?._id,
        user: item?.user?.name,
        note: item?.description,
        requirement: true
      },
    });
  };

  return (
    <TouchableOpacity style={styles.eventItem} onPress={() => goToScreen(item)}>
      <View style={styles.timeBlock}>
        <DateFormatComponent item={item} />
      </View>
      <View style={styles.detailsBlock}>
        <Text style={styles.eventTitle}>
          {localization.code === "en"
            ? item.service.name.nameEn
            : item.service.name.nameLocal}
        </Text>
        <Text style={styles.eventUser}>
          {item.user.name
            ? item.user.name
            : localization.code === "en"
              ? "unknown user"
              : "nepoznati korisnik"}
        </Text>

        <Text style={styles.eventStatus}>{localization.STATUS.pending}</Text>
      </View>
      <View style={styles.status}>
        <FontAwesome size={25} color="white" name="clock-o" />
      </View>
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

export default RequirementComponentItem;
