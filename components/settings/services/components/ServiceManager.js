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
import useServices from "../hooks/useServices";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import FloatingButton from "../../FloatingButton";
import { router, useFocusEffect } from "expo-router";

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

  const [removeItem, setRemoveItem] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isRemove, setIsRemove] = useState(null);

  const removeQuestion = (item) => {
    setIsRemove(true);
    setRemoveItem(item);
  };
  const removeCancelHandler = () => {
    setIsRemove(false);
  };
  const removeConfirmHandler = () => {
    setIsRemove(false);
    removeService(removeItem);
  };

  const cancelHandler = () => {
    setIsError(null);
  };

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addServices");
  };
  useFocusEffect(
    useCallback(() => {
      fetchAllServices();
    }, []),
  );

  if (isLoading === "remove") {
    return <SharedLoader isOpen={isLoading === "remove"} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{localization.SERVICES.listServices}</Text>
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={serviceData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={{ width: "52%", marginLeft: 10 }}>
                <View>
                  <Text style={styles.serviceText}>
                    {localization.code === "en"
                      ? item.name.nameEn
                      : item.name.nameLocal}
                  </Text>
                </View>
                <View>
                  <Text style={styles.serviceText}>{item.price} RSD</Text>
                </View>
                <View>
                  <Text style={styles.serviceText}>{item.duration} min</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => startEditing(item)}>
                  <Text style={styles.editHint}>
                    <FontAwesome name="edit" size={24} color="white" />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeQuestion(item)}>
                  <Text style={styles.editHint}>
                    <FontAwesome name="trash" size={24} color="white" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
      {isRemove && (
        <SharedQuestion
          isOpen={isRemove}
          onClose={removeCancelHandler}
          onLogOut={removeConfirmHandler}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.SERVICES.question}
          buttonTextYes={localization.SERVICES.confirmButton}
          buttonTextNo={localization.SERVICES.cancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#121212",
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
    backgroundColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
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
