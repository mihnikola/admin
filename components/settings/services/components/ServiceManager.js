import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImageCompress from "../../ImageCompress";
import useServices from "../hooks/useServices";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import FloatingButton from "../../FloatingButton";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

export default function ServiceManager() {
  const { localization } = useLocalization();
  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    serviceData,
    removeService,
    confirmHandler,
    fetchAllServices,
    startEditing,
  } = useServices();


  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");

  const filterServices = serviceData.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );
  const cancelHandler = () => {
    setIsError(null);
  };

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addServices");
  };

  useEffect(() => {
    fetchAllServices();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{localization.SERVICES.listServices}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder={localization.CLIENTS.search}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="white"
      />
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={filterServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => startEditing(item)}
            >
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={{ width: "52%", marginLeft: 10 }}>
                <View>
                  <Text style={styles.serviceText}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.serviceText}>{item.price} RSD</Text>
                </View>
                <View>
                  <Text style={styles.serviceText}>{item.duration} min</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.editHint}>
                    <FontAwesome name="edit" size={24} color="white" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <FloatingButton onPress={addServiceRouter} />
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000000",
  },
  searchInput: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    fontSize: 18,
    color: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
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
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: "#525252",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  serviceItem: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,

    borderColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
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
