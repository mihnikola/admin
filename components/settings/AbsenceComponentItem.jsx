import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AbsenceDateFormatComponent from "./../../components/home/components/AbsenceDateFormatComponent";

const AbsenceComponentItem = ({ item }) => {
  // const goToScreen = (item) => {
  //     router.push({
  //         pathname: "/(reservation_notification)/",
  //         params: {
  //             itemId: item?.id,
  //             user: item?.user?.name,
  //             note: item?.description,
  //             requirement: true,
  //         },
  //     });
  // };

  return (
    <TouchableOpacity key={item._id} style={styles.eventItem}>
      <View style={styles.timeBlock}>
        <AbsenceDateFormatComponent date={item.startDate} />
      </View>
      <View style={styles.detailsBlock}>
        <Text style={styles.eventTitle}>{item.description}</Text>
      </View>
      <View style={styles.timeBlock}>
        <AbsenceDateFormatComponent date={item.endDate} />
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
    gap:20,
    padding: 20,
    shadowColor: "#262626ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent:"space-around"
  },
  timeBlock: {
    alignItems: "center",
    justifyContent: "center",
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
    padding:10
  },
  eventUser: {
    fontSize: 14,
    fontWeight: "500",
    color: "#edededff",
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
});

export default AbsenceComponentItem;
