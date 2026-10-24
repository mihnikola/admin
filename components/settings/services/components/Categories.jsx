import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";
import Loader from "@/shared-components/Loader";
import CategoryItem from './CategoryItem';
import CategoryHeaderComponent from './CategoryHeaderComponent';
import SearchInputComponent from "../../sharedComponents/SearchInputComponent";
import { SharedButton } from "@/shared-components/SharedButton";
import { useServiceCategory } from "@/contexts/ServiceCategoryContext";

const Categories = () => {
  const { localization } = useLocalization();
  const { categoryId, serviceId, name } = useLocalSearchParams();
  const itemData = { name };
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
    addEditService,
    requestData,
    setRequestData,
    setServiceId
  } = useServiceCategory();

  const [selectedItem, setSelectedItem] = useState(categoryId ? { _id: categoryId } : null);
  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");

  const addCategoryToService = async () => {
    if (serviceId) {
      setRequestData(selectedItem);
      router.back()
      return;
    }
    const data = { ...requestData, category: selectedItem };
    await addEditService(data);
  };

  const filterCategories = categories.filter((category) =>
    category.name.nameEn.toLowerCase().includes(search.toLowerCase()) || category.name.nameLocal.toLowerCase().includes(search.toLowerCase())
  );
  const cancelHandler = () => {
    setIsError(null);
  };
  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addCategory");
  };

  useEffect(() => {
    setServiceId(serviceId);
    getAllCategories(categoryId);
  }, []);
  const startEditing = (data) => {
    const { _id: id } = data;
    router.push({
      pathname: "/(tabs)/(03_settings)/addCategory",
      params: { id },
    });
  };

  const checkHandler = (item) => {
    if (item._id == selectedItem?._id) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };


  return (
    <View style={styles.container}>
      <CategoryHeaderComponent addServiceRouter={addServiceRouter} onPress={router.back} name={itemData?.name} title={localization.CATEGORY.list} />
      <View style={styles.searchInputContainer}>
        <SearchInputComponent search={search} setSearch={setSearch} />
      </View>
      {isLoading === "get" && <Loader />}

      {isLoading !== "get" && (
        <FlatList
          data={filterCategories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CategoryItem selectedItem={selectedItem} checkHandler={checkHandler} item={item} startEditing={startEditing} />
          )}
        />
      )}
      <View style={{ paddingHorizontal: 10 }}>
        <SharedButton
          text={categoryId ? localization.CATEGORY.changeCategory : localization.SERVICES.submitAdd}
          disabled={!selectedItem?._id || selectedItem._id === categoryId}
          loading={isLoading === 'addEdit'}
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
              color={ColorsBarber.dark.textColor}
            />
          }
          onClose={() => confirmHandler(serviceId)}
          onConfirm={() => confirmHandler(serviceId)}
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
              color={ColorsBarber.dark.textColor}
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
    backgroundColor: ColorsBarber.dark.background,
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
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: "OldStandard-Bold",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default Categories;
