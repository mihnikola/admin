import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ColorsBarber } from "@/constants/Colors";
import SummaryItem from "./SummaryItem";
const Summary = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <ScrollView
      snapToInterval={5}
      decelerationRate="normal"
      showsVerticalScrollIndicator
    >
      <View style={styles.container}>
        {data?.map((item) => (
          <SummaryItem
            key={item.value}
            data={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    padding: 10,
    flexShrink:1,
    flexWrap: "wrap",
    backgroundColor: ColorsBarber.light.background,
  },
});

export default Summary;
