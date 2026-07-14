import { useLocalization } from "@/contexts/LocalizationContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

function SearchInputComponent({ search, setSearch }) {
  const { localization } = useLocalization();
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={localization.CLIENTS.search}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="white"
      />

      {search.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearch("")}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={22} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
   
    justifyContent: "center",
  },

  searchInput: {
    backgroundColor: "#3f3f3f",
    borderRadius: 8,
    padding: 14,
    paddingRight: 45, // prostor za X ikonu
    fontSize: 18,
    color: "#fff",
  },

  clearButton: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SearchInputComponent;
