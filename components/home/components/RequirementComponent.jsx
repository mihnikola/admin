import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import useRequirements from "./../hooks/useRequirements";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";
import { SharedLoader } from "@/shared-components/SharedLoader";
import RequirementComponentItem from "./RequirementComponentItem";
import { useCallback, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
export default function RequirementComponent() {
  const { isLoading, requirements, fetchRequirements } = useRequirements();

  const { localization } = useLocalization();
  const { height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.62;

  useFocusEffect(
    useCallback(() => {
      fetchRequirements();
    }, []),
  );

  if (isLoading === "fetchRequirements") {
    return <SharedLoader isOpen={isLoading === "fetchRequirements"} />;
  }

  console.log("requirements", requirements);
  return (
    <View style={styles.container}>
      <SharedBackButton onPress={router.back} styleBtn={{ marginTop: 20 }} />
      {requirements.length > 0 &&
        <View style={styles.header}>
          <Text style={styles.subTitle}>
            {localization.HOME.listRequirements}
          </Text>
        </View>
      }
      {requirements.length === 0 &&
        <View style={styles.card}>
          <Text style={styles.capture}>{localization.APPOINTMENTS.error}</Text>
        </View>
      }
      {requirements.length > 0 &&
        <View style={{ flex:1 }}>
          {isLoading !== "fetchRequirements" && (
            <FlatList
              data={requirements}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <RequirementComponentItem item={item} />}
            />
          )}
        </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    marginTop: 50,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "black",
    marginVertical: 80,
  },
  capture: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 80,
    fontWeight: "900",
    color: "white",
  },
});
