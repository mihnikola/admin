import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useLocationBarber from "./../hooks/useLocationBarber";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import BarberItem from "./BarberItem";
import BarberItemAssign from "./BarberItemAssign";
import SharedBackButton from "@/shared-components/SharedBackButton";

export default function Barbers() {
  const { localization } = useLocalization();
  const { id, address } = useLocalSearchParams();

  const itemData = {
    id,
    address,
  };
  const {
    isLoading,
    isMessage,
    message,
    locationBarbersData,
    confirmSubmit,
    getBarbersById,
    toggleBarber,
    submitChanges,
  } = useLocationBarber();
  const [search, setSearch] = useState("");

  const filterResult = locationBarbersData.filter((item) => item.flag === "T");
  const allResult = locationBarbersData.filter((item) => item.flag !== "T");

  const [isError, setIsError] = useState(null);

  const cancelHandler = () => {
    setIsError(null);
  };

  useEffect(() => {
    if (id) {
      setTimeout(async () => {
        await getBarbersById(id);
      }, 100);
    }
  }, [id]);
  const filteredBarbers = allResult.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <SharedBackButton onPress={router.back} styleBtn={{ marginTop: 5 }} />

      <Text style={styles.subTitle}>{localization.BARBERS.listBarbers}</Text>
      <View key={itemData.id} style={styles.itemContent}>
        <FontAwesome name="map-marker" size={25} color="white" />
        <Text style={styles.address}>
          {localization.SETTINGS.EMPLOYERSPLACES.location}
        </Text>
        <Text style={styles.address}>{itemData.address}</Text>
      </View>
      <View style={{ flex: 2, marginTop: 10 }}>
        <Text style={styles.addressBarbers}>
          {localization.SETTINGS.EMPLOYERSPLACES.barbersLength} (
          {filterResult.length})
        </Text>
        {isLoading === "getBarbers" ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={filterResult}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <BarberItemAssign item={item} toggleBarber={toggleBarber} />
            )}
          />
        )}
      </View>

      <View style={{ flex: 2, marginTop: 5 }}>
        <Text style={styles.addressBarbers}>
          {localization.SETTINGS.EMPLOYERSPLACES.availableBarbers} (
          {filteredBarbers.length})
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder={localization.CLIENTS.search}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="white"
        />
        {isLoading === "getBarbers" ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={filteredBarbers}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <BarberItem item={item} toggleBarber={toggleBarber} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => submitChanges(id)}>
        {isLoading === "post" ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {localization.SERVICES.saveChanges}
          </Text>
        )}
      </TouchableOpacity>

      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={confirmSubmit}
          onConfirm={confirmSubmit}
          buttonText="Ok"
          title={message}
        />
      )}
      {isError?.length > 0 && (
        <SharedMessage
          isOpen={isError?.length > 0}
          icon={<FontAwesome name="close" size={64} color="white" />}
          onClose={cancelHandler}
          onConfirm={cancelHandler}
          buttonText="Ok"
          title={isError}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingTop: 40,
  },
  searchInput: {
    backgroundColor: "#000000",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    color: "#fff",
  },
  itemContent: {
    alignItems: "baseline",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    backgroundColor: "#242424",
    flexDirection: "row",
    gap: 10,
  },

  addressBarbers: {
    color: "#fff",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  address: {
    marginHorizontal: 2,
    fontSize: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },

  subTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 22,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "rgb(0, 0, 0)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#525252",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  serviceText: {
    color: "#fff",
    fontSize: 15,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
  },
});
