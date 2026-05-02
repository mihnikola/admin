import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { useLocalization } from "./../../../../contexts/LocalizationContext";
import { Keyboard } from "react-native";
import { useCompany } from "@/contexts/CompanyContext";

const apiKey = Constants.expoConfig.extra.API_KEY_MAP;

export default function GooglePlace({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { company, getCompany } = useCompany();

  const { localization } = useLocalization(); // Fetch autocomplete suggestions

  useEffect(() => {
    getCompany();
  }, []);
  const searchPlaces = async (text) => {
    if (!text || text.length < 6) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          text,
        )}&key=${apiKey}&language=${localization.code}&components=country:${company?.country}`,
      );

      const data = await res.json();
      console.log("res", data);

      if (data.status === "OK") {
        setResults(data.predictions);
      } else {
        console.log("Autocomplete error:", data.status);
        setResults([]);
      }
    } catch (err) {
      console.log("Autocomplete fetch error:", err);
      setResults([]);
    }

    setLoading(false);
  };

  // Fetch place details (lat/lng, address components)
  const getPlaceDetails = async (placeId) => {
    try {
      const fields = "geometry,vicinity,address_components,name";
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`,
      );
      const data = await res.json();

      if (data.status === "OK") {
        //ovde ce da trpa niz lokacija
        return data.result;
      }
      console.log("Place details error:", data.status);
      return null;
    } catch (err) {
      console.log("Place details fetch error:", err);
      return null;
    }
  };

  // Extract street + city from place details
  //   const extractAddress = (details) => {
  //     const components = details.address_components;
  //     let city = "";
  //     let street = "";

  //     components.forEach((c) => {
  //       if (c.types.includes("locality")) city = c.long_name;
  //       if (c.types.includes("route")) street = c.long_name;
  //       if (c.types.includes("street_number"))
  //         street = `${c.long_name} ${street}`;
  //     });

  //     return { city, street };
  //   };

  // Handle selecting a suggestion
  const handleSelect = async (item) => {
    const addressValueData = item?.description.split(",")[0];
    console.log("handleSelect", item);
    const details = await getPlaceDetails(item.place_id);
    console.log("handleSelecthandleSelect", details);

    if (!details) return;

    // const { city, street } = extractAddress(details);
    const [_, city] = details.vicinity.split(",");
    const location = details.geometry.location;

    // Pass data back to parent
    onSelect({
      city,
      street: addressValueData,
      lat: location.lat,
      lng: location.lng,
      place_id: item.place_id,
      fullDetails: details,
    });

    // Clear query and results
    setQuery("");
    setResults([]);
    Keyboard.dismiss();
  };

  // Debounce user input
  useEffect(() => {
    if (query !== "") {
      const delayDebounce = setTimeout(() => {
        searchPlaces(query);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={localization.PLACES.search}
        value={query}
        onChangeText={setQuery}
      />
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.itemText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { zIndex: 1000, position: "relative" },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  list: {
    maxHeight: 200,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    marginTop: 5,
  },
  item: { padding: 10, borderBottomColor: "#444", borderBottomWidth: 1 },
  itemText: { color: "#fff" },
});
