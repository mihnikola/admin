import { StyleSheet, Text, View, FlatList } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import useLocationBarber from "./../hooks/useLocationBarber";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import { useEffect } from "react";
const Locations = () => {
  const { localization } = useLocalization();
  const {
    getLocations,
    onSelectedLocation,
    isLoading,
    locations,
    selectedLocation,
  } = useLocationBarber();

  useEffect(() => {
    getLocations();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localization.PLACES.title}</Text>
      <View style={{ flex: 1 }}>
        {isLoading === "getLocations" && (
          <Loader isOpen={isLoading === "getLocations"} />
        )}

        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LocationItem
              item={item}
              onSelectedLocation={onSelectedLocation}
              selectedLocation={selectedLocation}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.notFound}>{localization.PLACES.notFound}</Text>
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  notFound: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },

});
export default Locations;
