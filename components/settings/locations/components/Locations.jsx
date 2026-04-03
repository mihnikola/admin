import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import useLocation from "../hooks/useLocations";
import FloatingButton from "../../FloatingButton";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

const Locations = () => {
  const { localization } = useLocalization();
  const [search, setSearch] = useState("");

  const {
    isLoading,
    locations,
    getLocations,
    addLocationRouter,
    startEditing,
  } = useLocation();

  const filteredLocations = locations.filter((location) =>
    location.address.toLowerCase().includes(search.toLowerCase()),
  );

  useFocusEffect(
    useCallback(() => {
      getLocations();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localization.PLACES.title}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder={localization.CLIENTS.search}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="white"
      />

      {isLoading === "getPlaces" ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LocationItem item={item} startEditing={startEditing} />
          )}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.notFound}>{localization.PLACES.notFound}</Text>
          }
        />
      )}

      <FloatingButton onPress={addLocationRouter} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 20,
  },
  notFound: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  contentData: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: "#3f3f3f",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 20,
    fontSize: 18,
    color: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  btn: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
});
export default Locations;
