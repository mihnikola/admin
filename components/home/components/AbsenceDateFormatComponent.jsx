import { StyleSheet, Text, View } from "react-native";
import { convertTimeHandler, convertToDay, convertToMonthName } from "./../../../helpers";

const AbsenceDateFormatComponent = ({ date }) => {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.captureDate}>
        {convertToMonthName(date)}
      </Text>
      <Text style={styles.captureDateBold}>
        {convertToDay(date)}
      </Text>
      <Text style={styles.captureDate}>
        {convertTimeHandler(date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
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

export default AbsenceDateFormatComponent;
