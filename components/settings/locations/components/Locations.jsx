import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import useLocation from "../hooks/useLocations";
import FloatingButton from "../../FloatingButton";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

const Locations = () => {
  const { localization } = useLocalization();

  const {
    isLoading,
    locations,
    getLocations,
    addLocationRouter,
    startEditing,
  } = useLocation();

  const { height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.7;

  useFocusEffect(
    useCallback(() => {
      getLocations();
    }, []),
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{localization.PLACES.title}</Text>
          <View style={{ maxHeight: containerHeight }}>
            {isLoading === "getPlaces" && (
              <Loader isOpen={isLoading === "getPlaces"} />
            )}
            <ScrollView>
              {isLoading !== "getPlaces" &&
                locations.map((item) => (
                  <LocationItem
                    key={item.id}
                    item={item}
                    startEditing={startEditing}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <FloatingButton onPress={addLocationRouter} />
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  btn: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
});
export default Locations;
