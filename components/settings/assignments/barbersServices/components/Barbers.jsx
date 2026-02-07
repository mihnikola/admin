import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useBarbersService from "./../hooks/useBarbersService";
import Loader from "../../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useFocusEffect } from "expo-router";
import BarberItem from './BarberItem';

export default function Barbers() {
  const { localization } = useLocalization();
  const {
    isLoading,
    error,
    isMessage,
    message,
    barbersData,
    confirmHandler,
    fetchAllBarbers,
    assignmentHandler,
  } = useBarbersService();

  const [isError, setIsError] = useState(null);

  const cancelHandler = () => {
    setIsError(null);
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
            <BarberItem item={item} assignmentHandler={assignmentHandler} />
          )}
        />
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

  barberItem: {
    backgroundColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  barberText: {
    color: "#fff",
    fontSize: 15,
  },
});
