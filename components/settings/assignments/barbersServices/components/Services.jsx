import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useBarbersService from "../hooks/useBarbersService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import ServiceItem from './ServiceItem';
import BarberItem from "./BarberItem";

export default function Services() {

  const { height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.55;
  const { localization } = useLocalization();
  const { id, name, image, phoneNumber } = useLocalSearchParams();

  const itemData = {
    id, name, image, phoneNumber: phoneNumber || ""
  }
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
    getServicesById,
    startEditing,
    servicesByBarbers,
    toggleService,
    submitChangesServiceToBarber,
  } = useBarbersService();

  const [isError, setIsError] = useState(null);

  const cancelHandler = () => {
    setIsError(null);
  };

  useEffect(() => {
    if (id) {
      getServicesById(id);
    }
  }, [id]);

  if (isLoading === "getServices") {
    return <SharedLoader isOpen={isLoading === "getServices"} />;
  }


  return (
    <View style={styles.container}>
      {id && <BarberItem item={itemData} id={id} />}
      <Text style={styles.subTitle}>{localization.SERVICES.listServices}</Text>
      <View style={{ maxHeight: containerHeight }}>
        {isLoading === "get" && <Loader />}
        {isLoading !== "get" && (
          <FlatList
            data={servicesByBarbers}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (<ServiceItem item={item} toggleService={toggleService} />
            )}
          />
        )}
      </View>
      {isLoading !== "get" && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitChangesServiceToBarber(id)}
          >
            {isLoading === "patch" && (
              <ActivityIndicator size={20} color="#fff" />
            )}
            {isLoading !== "patch" && (
              <Text style={styles.buttonText}>
                {localization.SERVICES.saveChanges}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

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
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
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
