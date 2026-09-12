import { ColorsBarber } from "@/constants/Colors";
import { convertDateDetails } from "@/helpers";
import { StyleSheet, Text, View } from "react-native";

const HeaderReservationTime = ({ data }) => {
  if (data) {
    return (
      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {data?.startDateTime} - {data?.finishedTime}
        </Text>
        <Text style={styles.dateData}>
          {convertDateDetails(data?.eventDate)}
        </Text>
        <Text style={styles.locationData}>{data?.place?.address}</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  locationData: {
    fontSize: 18,
    color: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Bold"
  },
  dateData: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Bold"
  },
  timeData: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Bold"
  },
  coverContent: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 100,
  },
});

export default HeaderReservationTime;
