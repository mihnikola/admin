import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useBarbersService from "./../hooks/useBarbersService";
import Loader from "../../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useFocusEffect } from "expo-router";
import BarberItem from "./BarberItem";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SearchInputComponent from "@/components/settings/SearchInputComponent";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";

const Barbers = () => {
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
  const [search, setSearch] = useState("");

  const filterDataBarber = barbersData.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          marginLeft: 15,
          marginBottom: 10,
        }}
      >
        <SharedBackButton onPress={router.back} absolutePosition={false} />

        <Text style={styles.subTitle}>{localization.BARBERS.listBarbers}</Text>
      </View>
      <View style={styles.searchInputContainer}>
        <SearchInputComponent search={search} setSearch={setSearch} />
      </View>
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={filterDataBarber}
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
    backgroundColor: "#000000",
  },
  searchInputContainer: {
    marginVertical: 8,
    marginHorizontal: 20,
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
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
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

export default withKeyboardAvoid(Barbers);