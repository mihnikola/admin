import { StyleSheet, Text, View } from "react-native";
import {
  convertTimeHandler,
  convertToDay,
  convertToMonthName,
} from "./../../../helpers";
import { ColorsBarber } from "@/constants/Colors";

const DateFormatComponent = ({ item }) => {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.captureDate}>
        {convertToMonthName(item?.startTime)}
      </Text>
      <Text style={styles.captureDateBold}>
        {convertToDay(item?.startTime)}
      </Text>
      <Text style={styles.captureDate}>
        {convertTimeHandler(item?.startTime)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  captureDate: {
    fontSize: 18,
    color: ColorsBarber.light.textColor,
    textAlign: "center",
    fontFamily: "OldStandard-Bold",
  },
  captureDateBold: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
});

export default DateFormatComponent;
