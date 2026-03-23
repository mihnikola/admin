import { ScrollView, StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
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
    location.address.toLowerCase().includes(search.toLowerCase())
  );

  const { height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.7;

  useFocusEffect(
    useCallback(() => {
      getLocations();
    }, []),
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{localization.PLACES.title}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={localization.CLIENTS.search}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="white"
        />
        <View style={styles.content}>
          <View style={{ maxHeight: containerHeight }}>
            {isLoading === "getPlaces" && (
              <Loader isOpen={isLoading === "getPlaces"} />
            )}
            <ScrollView>
              {isLoading !== "getPlaces" &&
                filteredLocations.map((item) => (
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
  searchInput: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 20,
    fontSize: 18,
    color: "white"
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
