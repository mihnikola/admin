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
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { getInitialsName } from "@/helpers";
import SearchInputComponent from "../../SearchInputComponent";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";

const BarbersList = () => {
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
    startEditing,
  } = useBarbers();

  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");

  const filterDataBarber = barbersData.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );
  const cancelHandler = () => {
    setIsError(null);
  };

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addBarbers");
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.subTitle}>{localization.BARBERS.listBarbers}</Text> */}
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
          renderItem={({ item }) => {
            const initials = getInitialsName(item.name);

            return (
              <TouchableOpacity
                onPress={() => startEditing(item)}
                style={[styles.barberItem, item.deletedAt && styles.deletedAt]}
              >
                <View style={{ flexDirection: "row" }}>
                  {item.image && (
                    <View>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </View>
                  )}

                  {!item.image && (
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                  )}

                  <View style={{ marginLeft: 10 }}>
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
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.editHint}>
                    <FontAwesome name="edit" size={24} color="white" />
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
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
  deletedAt: {
    backgroundColor: "#000000",
    opacity: 0.4,
  },
  barberItem: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
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
export default withKeyboardAvoid(BarbersList);
