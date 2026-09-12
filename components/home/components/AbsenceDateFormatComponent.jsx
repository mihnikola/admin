import { ColorsBarber } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import {
  convertTimeHandler,
  convertToDay,
  convertToMonthName,
} from "./../../../helpers";

const AbsenceDateFormatComponent = ({ date }) => {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.captureDate}>{convertToMonthName(date)}</Text>
      <Text style={styles.captureDateBold}>{convertToDay(date)}</Text>
      <Text style={styles.captureDate}>{convertTimeHandler(date)}</Text>
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
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.light.textColor,
  },

  captureDateBold: {
    fontSize: 20,
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.light.textColor,
  },
});

export default AbsenceDateFormatComponent;
