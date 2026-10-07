import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";

function SummaryServices({ service, data, totalDuration, totalPrice }) {
   const totals = data?.reduce(
    (acc, current) => {
      acc.totalPrice += current?.service?.price;
      acc.totalDuration += current?.service?.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );
  const { localization } = useLocalization();
  return (
    <View>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={styles.textLabel}>
              {localization.SERVICES.totalDuration}
            </Text>
          </View>
          <View>
            {totalDuration && <Text style={styles.text}>{totalDuration}{" min"}</Text>}
            {!totalDuration && (
              <Text style={styles.text}>
                {totals.totalDuration + service?.duration ||
                  service?.duration}
                {" min"}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={styles.textLabel}>
              {localization.SERVICES.totalPrice}
            </Text>
          </View>
          <View>
            {totalPrice && <Text style={styles.text}>{totalPrice}{" rsd"}</Text>}
            {!totalPrice && (
              <Text style={styles.text}>
                {totals.totalPrice + service?.price || service?.price}
                {" rsd"}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  dividerText: {
    color: ColorsBarber.dark.textColor,
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: "OldStandard-Bold",
  },
  text: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Regular",
  },
  textLabel: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
  },
});
export default SummaryServices;
