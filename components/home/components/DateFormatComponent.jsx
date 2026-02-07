import { StyleSheet, Text, View } from "react-native";
import { convertToDay, convertToDayTime, convertToMonthName } from "./../../../helpers";

const DateFormatComponent = ({ item }) => {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.captureDate}>
        {convertToMonthName(item?.startDate)}
      </Text>
      <Text style={styles.captureDateBold}>
        {convertToDay(item?.startDate)}
      </Text>
      <Text style={styles.captureDate}>
        {convertToDayTime(item?.startDate)}
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
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },

  captureDateBold: {
    fontSize: 20,
    color: "white",
    fontWeight: "900",
  },
});

export default DateFormatComponent;
