import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useServices from "../hooks/useServices";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import FloatingButton from "../../FloatingButton";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SearchInputComponent from "../../SearchInputComponent";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import { ColorsBarber } from "@/constants/Colors";

const ServiceManager = () => {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          marginLeft: 10,
          marginBottom: 20,
        }}
      >
        <SharedBackButton onPress={router.back} absolutePosition={false} />

        <Text style={styles.subTitle}>
          {localization.SERVICES.listServices}
        </Text>
      </View>
      <View style={styles.searchInputContainer}>
        <SearchInputComponent search={search} setSearch={setSearch} />
      </View>
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
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ marginLeft: 10 }}>
                  <View>
                    <Text style={styles.serviceTextName}>{item.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.serviceText}>{item.price} RSD</Text>
                  </View>
                  <View>
                    <Text style={styles.serviceText}>{item.duration} min</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.editHint}>
                    <FontAwesome
                      name="edit"
                      size={24}
                      color={ColorsBarber.light.textColor}
                    />
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
          icon={
            <FontAwesome
              name="check-circle-o"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          buttonText="Ok"
          title={message}
        />
      )}
      {isError?.length > 0 && (
        <SharedMessage
          isOpen={isError?.length > 0}
          icon={
            <FontAwesome
              name="close"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          onClose={cancelHandler}
          onConfirm={cancelHandler}
          buttonText="Ok"
          title={isError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: ColorsBarber.light.background,
  },
  searchInputContainer: {
    marginBottom: 10,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
  },
  subTitle: {
    fontSize: 18,
    color: ColorsBarber.light.textColor,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
    fontFamily: "OldStandard-Bold",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: "OldStandard-Bold",
  },

  cancelButton: {
    backgroundColor: "#525252",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  serviceItem: {
    backgroundColor: ColorsBarber.light.item,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
  },
  serviceText: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    fontSize: 15,
  },
  serviceTextName: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",

    fontSize: 14,
    flexWrap: "wrap",
    flexShrink: 1,
    maxWidth: 200,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
  },
});

export default withKeyboardAvoid(ServiceManager);
