import SharedCarousel from "@/shared-components/SharedCarousel";
import { useIsFocused } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useGetClients from "./hooks/useGetClients";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function ClientsScreen() {
  const [search, setSearch] = useState("");
  const { clients, fetchAllClients } = useGetClients();
  const { localization } = useLocalization();

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const isFocusClientTab = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      fetchAllClients();
    }, [isFocusClientTab])
  );

  const getClient = (item) => {
    router.push({ pathname: "/(tabs)/(02_clients)/client", params: item });
  };

  const renderClient = ({ item }) => {
    const initials = item.name ? item.name.substring(0, 2).toUpperCase() : "";

    return (
      <TouchableOpacity
        style={styles.clientCard}
        onPress={() => getClient(item)}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.name}>{item.name}</Text>
          {item.phoneNumber && (
            <Text style={styles.phone}>{item.phoneNumber}</Text>
          )}
          <Text style={styles.details}>
            {localization.CLIENTS.finished} <Text style={styles.done}>{item.approvedCount}</Text>
            {localization.CLIENTS.missed} <Text style={styles.missed}>{item.skippedCount}</Text>
          </Text>
          <Text style={styles.income}>
            {localization.CLIENTS.total} {item.totalRevenue.toFixed(2)} RSD
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SharedCarousel title={localization.TABS.CLIENTS} length={clients.length} />
      <TextInput
        style={styles.searchInput}
        placeholder={localization.CLIENTS.search}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="white"
      />
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 40,
  },

  searchInput: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 10,
    margin: 18,
    fontSize: 18,
  },
  clientCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    top: -2,
    left: -2,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clientInfo: { flex: 1 },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  phone: {
    color: "#aaa",
    fontSize: 12,
  },
  details: {
    color: "#ccc",
    fontSize: 12,
  },
  done: {
    color: "lightgreen",
  },
  missed: {
    color: "tomato",
  },
  income: {
    color: "#fff",
    fontWeight: "bold",
  },
});
