import SharedCarousel from "@/shared-components/SharedCarousel";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
// import useFetchLocations from "../..";

import useFetchPlaces from "@/components/home/hooks/useFetchPlaces";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const locations = [
  {
    id: 1,
    address: "Kralja Petra 12, 11000 Beograd",
  },
  {
    id: 2,
    address: "Bulevar kralja Aleksandra 75, 11000 Beograd",
  },
  {
    id: 3,
    address: "Nemanjina 22, 11000 Beograd",
  },
  {
    id: 4,
    address: "Takovska 23, 11000 Beograd",
  },
  {
    id: 5,
    address: "Džordža Vašingtona 9, 11000 Beograd",
  },
  {
    id: 6,
    address: "Dr Ivana Ribara 72, 11070 Beograd",
  },
  {
    id: 7,
    address: "Svetog Save 39, 11000 Beograd",
  },
  {
    id: 8,
    address: "Vojvode Stepe 45, 11000 Beograd",
  },
  {
    id: 9,
    address: "Miletića 12, 11000 Beograd",
  },
  {
    id: 10,
    address: "Zorana Đinđića 30, 11000 Beograd",
  },
];
export default function MenuServices() {
  const [search, setSearch] = useState("");
  const { locationsData, isLoading, error, fetchLocations } = useFetchPlaces();
  const funcDateTimeReservation = (service) => {
    console.log("object", service);
    router.push("/(tabs)/(01_home)/calendar");
  };
  const filteredLocation = locations.filter((location) =>
    location.address.toLowerCase().includes(search.toLowerCase())
  );
  const getClient = (item) => {
    router.push("/(tabs)/(01_home)/calendar");
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => getClient(item)}
      >
        <Image
          source={require("@/assets/images/pinImage.png")}
          style={styles.profileImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.address}</Text>
        </View>
        <View style={styles.locationContainer}>
          <FontAwesome name={"arrow-right"} size={25} color="#CCCCCC" />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SharedCarousel title="Locations" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="white"
      />
      <FlatList
        data={locationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 10,
    margin: 18,
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 15,
  },

  contentContainer: {
    flex: 1,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#111",
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});
