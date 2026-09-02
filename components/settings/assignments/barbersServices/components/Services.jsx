import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import ServiceItemAssign from "./ServiceItemAssign";
import ServiceItem from "./ServiceItem";
import SharedBackButton from "@/shared-components/SharedBackButton";
import useBarbersService from "../hooks/useBarbersService";
import { SharedLoader } from "@/shared-components/SharedLoader";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import SearchInputComponent from "@/components/settings/SearchInputComponent";

const Services = () => {
  const { localization } = useLocalization();
  const { id, name, image, phoneNumber } = useLocalSearchParams();

  const itemData = {
    id,
    name,
    image,
    phoneNumber: phoneNumber || "",
  };
  // const itemData = {
  //   id,
  //   address,
  // };
  // const {
  //   isLoading,
  //   isMessage,
  //   message,
  //   locationBarbersData,
  //   confirmSubmit,
  //   getBarbersById,
  //   toggleBarber,
  //   submitChanges,
  // } = useLocationBarber();
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
    initialServices,
  } = useBarbersService();

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const filterResult = servicesByBarbers.filter((item) => item.assigned);
  const allResult = servicesByBarbers.filter((item) => !item.assigned);

  const [disabledBtn, setDisabledBtn] = useState(true);

  const initialNumber = initialServices?.filter((item) => {
    if (item?.assigned) {
      return item;
    }
  });

  const areListsEqual = (list1, list2) => {
    if (list1.length !== list2.length) return false;

    const list2Map = new Map(list2.map((item) => [item._id, item]));

    return list1.every((item) => {
      const other = list2Map.get(item._id);

      if (!other) return false;

      return Object.keys(item).every((key) => item[key] === other[key]);
    });
  };
  useEffect(() => {
    if (areListsEqual(initialNumber, filterResult)) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [servicesByBarbers]);

  const [isError, setIsError] = useState(null);

  const cancelHandler = () => {
    setIsError(null);
  };

  useEffect(() => {
    if (id) {
      setTimeout(async () => {
        await getServicesById(id);
      }, 100);
    }
  }, [id]);

  const filteredService = allResult.filter(
    (service) =>
      service.name.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      service.name.nameLocal.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading === "getServices") {
    return <SharedLoader isOpen={isLoading === "getServices"} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerComponent}>
        <View style={styles.headerRow}>
          <TouchableOpacity hitSlop={20} onPress={router.back}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>

          {/* Kolona sa Naslovom i Adresom desno od strelice */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.pageTitleHeader}>
              {localization.SERVICES.listServices}
            </Text>
            <Text style={styles.addressHeader}>{itemData.name}</Text>
          </View>
        </View>
      </View>
      {!isFocused && (
        <View style={{ flex: 1.5, paddingHorizontal: 12, paddingBottom: 24 }}>
          <Text style={styles.addressBarbersX}>
            {localization.SETTINGS.SERVICESBARBERS.servicesLength} (
            {filterResult.length})
          </Text>

          <FlatList
            data={filterResult}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ServiceItemAssign item={item} toggleService={toggleService} />
            )}
          />
        </View>
      )}

      <View style={{ flex: 1.5, paddingHorizontal: 12, paddingBottom: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.addressBarbers}>
            {localization.SETTINGS.SERVICESBARBERS.availableServices} (
            {filteredService.length})
          </Text>
          {isFocused && (
            <TouchableOpacity onPress={() => setIsFocused(false)}>
              <FontAwesome size={20} name="chevron-down" color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.searchInputContainer}>
          <SearchInputComponent
            onFocus={() => setIsFocused(true)}
            search={search}
            setSearch={setSearch}
          />
        </View>

        <FlatList
          data={filteredService}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ServiceItem item={item} toggleService={toggleService} />
          )}
        />
      </View>
      <View style={{ marginHorizontal: 12 }}>
        <SharedButtonApproved
          onPress={() => submitChangesServiceToBarber(id)}
          loading={isLoading === "patch"}
          text={localization.SERVICES.saveChanges}
          disabled={disabledBtn}
        />
      </View>

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
};

const styles = StyleSheet.create({
  // Stilovi za NOVI Fiksni Header
  headerComponent: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 16, // Dodat padding nazad ovde
    backgroundColor: "#000", // Osigurava da se ne providi
    borderBottomWidth: 1,
    borderColor: "#1A1A1A", // Suptilna linija za odvajanje
  },
  searchInputContainer: {
    marginVertical: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10, // Prostor desno od strelice
    justifyContent: "center",
  },
  pageTitleHeader: {
    fontSize: 18, // Malo manji, ali i dalje dominantan
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  addressHeader: {
    color: "#AAA", // Svetlije siva za adresu
    fontSize: 14,
    fontWeight: "400",
    marginTop: 2,
  },
  loadingContainer: {
    paddingTop: 40,
  },

  itemContent: {
    alignItems: "baseline",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    backgroundColor: "#242424",
    flexDirection: "row",
    gap: 10,
  },
  addressBarbersX: {
    color: "#fff",
    fontSize: 15,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  addressBarbers: {
    color: "#fff",
    fontSize: 17,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 6,
  },
  container: {
    flex: 1,
    margin: 10,
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
    fontSize: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },

  subTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 22,
    marginBottom: 5,
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
export default withKeyboardAvoid(Services);
