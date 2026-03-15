import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
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
import useBarbers from "../hooks/useBarbers";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import FloatingButton from "../../FloatingButton";
import { router, useFocusEffect } from "expo-router";

export default function BarbersList() {
  const { localization } = useLocalization();
  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    barbersData,
    confirmHandler,
    fetchAllBarbers,
    startEditing,
  } = useBarbers();

  const [isError, setIsError] = useState(null);

  const cancelHandler = () => {
    setIsError(null);
  };

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addBarbers");
  };
  useFocusEffect(
    useCallback(() => {
      fetchAllBarbers();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{localization.BARBERS.listBarbers}</Text>
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={barbersData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => startEditing(item)}
              style={styles.barberItem}
            >
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={{ width: "52%", marginLeft: 10 }}>
                <View>
                  <Text style={styles.serviceText}>{item.name}</Text>
                </View>
                {item?.seniority?.title && (
                  <View>
                    <Text style={styles.serviceText}>
                      {item?.seniority?.title}
                    </Text>
                  </View>
                )}
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
  barberItem: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
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
