import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { useLocalization } from "./../../../../contexts/LocalizationContext";
import { useCompany } from "@/contexts/CompanyContext";
import SearchInputComponent from "../../sharedComponents/SearchInputComponent";
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";

const apiKey = Constants.expoConfig.extra.API_KEY_MAP;

export default function GooglePlace({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { company, getCompany } = useCompany();

  const { localization } = useLocalization();

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
      const url =
        `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
        `?input=${encodeURIComponent(text)}` +
        `&types=geocode` +
        `&language=${localization.code}` +
        `&components=country:${company?.country}` +
        `&key=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK") {
        setResults(data.predictions || []);
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

  const getPlaceDetails = async (placeId) => {
    try {
      const fields =
        "place_id,geometry,vicinity,address_components,name,formatted_address";

      const url =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${placeId}` +
        `&fields=${fields}` +
        `&language=${localization.code}` +
        `&key=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK") {
        return data.result;
      }
      console.log("Place details error:", data.status);
      return null;
    } catch (err) {
      console.log("Place details fetch error:", err);
      return null;
    }
  };

  const handleSelect = async (item) => {
    const addressValueData = item?.description.split(",")[0];
    const details = await getPlaceDetails(item.place_id);

    if (!details) return;

    const [_, city] = details.vicinity.split(",");
    const location = details.geometry.location;
    const canonicalPlaceId = details.place_id;

    onSelect({
      city: city ? city.trim() : "",
      street: addressValueData,
      lat: location.lat,
      lng: location.lng,
      place_id: canonicalPlaceId,
      fullDetails: details,
    });

    setQuery("");
    setResults([]);
    Keyboard.dismiss();
  };

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
      <View style={styles.searchInputContainer}>
        <SearchInputComponent
          search={query}
          setSearch={setQuery}
          placeholderText={localization.PLACES.search}
        />
      </View>

      {loading && <ActivityIndicator size="small" color={ColorsBarber.dark.textColor} />}

     
      {results.length > 0 && (
        <View style={styles.list}>
          {results.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.itemText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { zIndex: 1000, position: "relative" },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 20,
    borderRadius: 8,
    fontFamily: "OldStandard-Bold",
  },
  searchInputContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  list: {
    maxHeight: 200,
    backgroundColor: ColorsBarber.dark.item,
    borderRadius: 8,
    marginTop: 5,
  },
  item: { padding: 10, borderBottomColor: "#444", borderBottomWidth: 1, fontFamily: "OldStandard-Bold", },
  itemText: { color: ColorsBarber.dark.textColor, fontFamily: "OldStandard-Bold", },
});