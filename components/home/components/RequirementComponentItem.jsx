import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateFormatComponent from "./DateFormatComponent";
import { ColorsBarber } from "@/constants/Colors";
const RequirementComponentItem = ({ item }) => {
  const { localization } = useLocalization();

  const goToScreen = (item) => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: item?.id,
        user: item?.user?.name,
        note: item?.description,
        requirement: true,
      },
    });
  };

  return (
    <TouchableOpacity
      key={item.id}
      style={styles.eventItem}
      onPress={() => goToScreen(item)}
    >
      <View style={styles.timeBlock}>
        <DateFormatComponent item={item} />
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

        <Text style={styles.eventStatus}>{localization.STATUS.pending}</Text>
      </View>
      <View style={styles.status}>
        <FontAwesome
          size={25}
          color={ColorsBarber.light.textColor}
          name="clock-o"
        />
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
    backgroundColor: ColorsBarber.light.item,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
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
    borderRightColor: ColorsBarber.light.textColor,
    paddingRight: 15,
  },

  detailsBlock: {
    flex: 1, // Take remaining space
  },
  eventTitle: {
    fontSize: 16,
    color: ColorsBarber.light.textColor,

    fontFamily: "OldStandard-Bold",
    marginBottom: 5,
  },
  eventUser: {
    fontSize: 14,
    marginBottom: 5,
    color: ColorsBarber.light.textColor,

    fontFamily: "OldStandard-Bold",
  },
  eventStatus: {
    fontSize: 12,
    fontFamily: "OldStandard-Bold",
    textTransform: "uppercase",
    color: ColorsBarber.light.textColor,
  },
});

export default RequirementComponentItem;
