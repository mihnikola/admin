import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";

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
      <View style={styles.headerComponent}>
        <View style={styles.headerRow}>
          <TouchableOpacity hitSlop={20} onPress={router.back}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>

          {/* Kolona sa Naslovom i Adresom desno od strelice */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.pageTitleHeader}>
              {localization.BARBERS.listBarbers}
            </Text>
            <Text style={styles.addressHeader}>{itemData.address}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 2, marginVertical: 5, paddingHorizontal: 16, paddingBottom: 24 }}>
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

      <View style={{ flex: 2,paddingHorizontal: 16, paddingBottom: 24 }}>
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
          />
        )}
      </View>
            <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>

      <SharedButtonApproved
        onPress={() => submitChanges(id)}
        loading={isLoading === "post"}
        text={localization.SERVICES.saveChanges}
      />
      </View>

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
  // Stilovi za NOVI Fiksni Header
  headerComponent: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 16, // Dodat padding nazad ovde
    backgroundColor: "#000", // Osigurava da se ne providi
    borderBottomWidth: 1,
    borderColor: "#1A1A1A", // Suptilna linija za odvajanje
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10, // Prostor desno od strelice
    justifyContent: "center",
  },
  pageTitleHeader: {
    fontSize: 20, // Malo manji, ali i dalje dominantan
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  addressHeader: {
    color: "#AAA", // Svetlije siva za adresu
    fontSize: 14,
    fontWeight: "400",
    marginTop: 2,
  },

  loadingContainer: {
    paddingTop: 40,
  },
  searchInput: {
    backgroundColor: "#000000",
    borderRadius: 8,
    fontSize: 16,
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
    fontSize: 17,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 10
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
