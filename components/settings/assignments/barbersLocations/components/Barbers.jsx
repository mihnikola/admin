import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useLocationBarber from "./../hooks/useLocationBarber";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import BarberItem from "./BarberItem";

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

  return (
    <View style={styles.container}>
      {itemData.id && (
        <View key={itemData.id} style={styles.itemContent}>
          <Text style={styles.address}>{itemData.address}</Text>
        </View>
      )}
      <Text style={styles.subTitle}>{localization.BARBERS.listBarbers}</Text>
    
      <View style={{ flex: 1 }}>
        {isLoading === "getBarbers" ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={locationBarbersData}
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
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  address: {
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    padding: 10,
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
    fontSize: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 9,
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
