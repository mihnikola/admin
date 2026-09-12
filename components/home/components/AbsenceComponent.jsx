import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import useAbsence from "../hooks/useAbscence";
import AbsenceComponentItem from "@/components/settings/AbsenceComponentItem";
import { ColorsBarber } from "@/constants/Colors";
export default function AbsenceComponent() {
  const { isLoading, absenceData, fetchAbsence } = useAbsence();

  const { localization } = useLocalization();

  useFocusEffect(
    useCallback(() => {
      fetchAbsence();
    }, []),
  );

  if (isLoading === "fetchAbsence") {
    return <SharedLoader isOpen={isLoading === "fetchAbsence"} />;
  }
  return (
    <View style={styles.container}>
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginTop: 20, marginLeft: 10 }}
      />
      <View style={styles.header}>
        <Text style={styles.subTitle}>{localization.HOME.listAbsence}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading !== "fetchAbsence" && (
          <FlatList
            data={absenceData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <AbsenceComponentItem item={item} />}
            contentContainerStyle={styles.item}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    gap: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: ColorsBarber.light.background,
    paddingHorizontal: 15,
  },
  header: {
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor,
    textAlign: "center",
  },
 
});
