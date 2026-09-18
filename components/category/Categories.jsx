import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { ColorsBarber } from "@/constants/Colors";
import Loader from "@/shared-components/Loader";
import SearchInputComponent from "../settings/SearchInputComponent";
import { useCategories } from "@/contexts/CategoriesContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { useServicesStore } from "@/contexts/ServiceContext";
const Categories = () => {
  const { setServiceCategory } = useServicesStore();
  const { localization } = useLocalization();
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    getAllCategories,
    error,
    isLoading,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    removeService,
    confirmHandler,
    categories,
  } = useCategories();

  const addCategoryToService = () => {
    setServiceCategory(selectedItem);
    router.back();
  };

  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");

  const filterCategories = categories.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );
  const cancelHandler = () => {
    setIsError(null);
  };
  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addCategory");
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const startEditing = (data) => {
    const { _id: id, name } = data;
    router.push({
      pathname: "/(tabs)/(03_settings)/addCategory",
      params: { categoryValue: name, id },
    });
  };

  const checkHandler = (item) => {
    setSelectedItem(item);
  };

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

        <Text style={styles.subTitle}>{localization.CATEGORY.list}</Text>
        <TouchableOpacity onPress={addServiceRouter}>
          <MaterialCommunityIcons
            name="playlist-plus"
            size={32}
            color={ColorsBarber.light.textColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInputContainer}>
        <SearchInputComponent search={search} setSearch={setSearch} />
      </View>
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={filterCategories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => checkHandler(item)}>
                  <FontAwesome
                    name={
                      selectedItem?._id === item?._id
                        ? "check-circle"
                        : "circle-o"
                    }
                    size={28}
                    color={ColorsBarber.light.textColor}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.serviceTextName}>{item.name}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editHint}
                onPress={() => startEditing(item)}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <FontAwesome
                  name="edit"
                  size={28}
                  color={ColorsBarber.light.textColor}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {/* <FloatingButton onPress={addServiceRouter} /> */}
      <View style={{ paddingHorizontal: 10 }}>
        <SharedButton
          text={localization.CATEGORY.add}
          onPress={addCategoryToService}
        />
      </View>
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
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
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
  editHint: {},
});

export default Categories;
