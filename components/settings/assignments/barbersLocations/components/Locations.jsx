import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import useLocationBarber from "./../hooks/useLocationBarber";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import { useEffect, useState } from "react";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import SearchInputComponent from "@/components/settings/SearchInputComponent";
const Locations = () => {
  const { localization } = useLocalization();
  const [search, setSearch] = useState("");

  const {
    getLocations,
    onSelectedLocation,
    isLoading,
    locations,
    selectedLocation,
  } = useLocationBarber();
  const filteredLocations = locations.filter((location) =>
    location.address.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          marginLeft: 15,
          marginBottom: 2,
        }}
      >
        <SharedBackButton onPress={router.back} absolutePosition={false} />

        <Text style={styles.title}>{localization.PLACES.title}</Text>
      </View>
      <View style={styles.searchInputContainer}>
        <SearchInputComponent search={search} setSearch={setSearch} />
      </View>
      <View style={{ flex: 1 }}>
        {isLoading === "getLocations" && (
          <Loader isOpen={isLoading === "getLocations"} />
        )}
        {!isLoading && (
          <FlatList
            data={filteredLocations}
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
              <Text style={styles.notFound}>
                {localization.PLACES.notFound}
              </Text>
            }
          />
        )}
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
  searchInputContainer: {
    marginVertical: 8,
    marginHorizontal: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
  },
});
export default Locations;
