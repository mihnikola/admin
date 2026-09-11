import { StyleSheet, Text, View } from "react-native";
import { convertTimeHandler, convertToDay, convertToMonthName } from "./../../../helpers";
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
    borderWidth: 1,
    borderColor: "white",
    borderLeftWidth: 3,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  captureDate: {
    fontSize: 18,
   color:ColorsBarber.light.textColor,
    textAlign: "center",
    fontWeight: "500",
  },

  captureDateBold: {
    fontSize: 20,
   color:ColorsBarber.light.textColor,
    fontWeight: "900",
  },
});

export default DateFormatComponent;
