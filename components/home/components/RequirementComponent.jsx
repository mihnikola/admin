import { View, Text, StyleSheet, FlatList } from "react-native";
import useRequirements from "./../hooks/useRequirements";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedLoader } from "@/shared-components/SharedLoader";
import RequirementComponentItem from "./RequirementComponentItem";
import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
export default function RequirementComponent() {
  const { isLoading, requirements, fetchRequirements } = useRequirements();

  const { localization } = useLocalization();

  useFocusEffect(
    useCallback(() => {
      fetchRequirements();
    }, []),
  );

  if (isLoading === "fetchRequirements") {
    return <SharedLoader isOpen={isLoading === "fetchRequirements"} />;
  }
  if (requirements.length === 0) {
    return (
      <View style={styles.card}>
        <View>
          <SharedBackButton
            onPress={router.back}
            styleBtn={{ marginTop: 20 }}
          />
        </View>
        <View style={{ marginTop: 100 }}>
          <Text style={styles.capture}>{localization.APPOINTMENTS.error}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SharedBackButton onPress={router.back} styleBtn={{ margin: 15 }} />
      <View style={styles.header}>
        <Text style={styles.subTitle}>
          {localization.HOME.listRequirements}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading !== "fetchRequirements" && (
          <FlatList
            data={requirements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RequirementComponentItem item={item} />}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  header: {
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#000",
    flex: 1,
    flexDirection: "column",
  },
  capture: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 80,
    fontWeight: "900",
    color: "#fff",
  },
});
