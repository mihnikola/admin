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
import useLocationBarber from "./../hooks/useLocationBarber";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import BarberItem from "./BarberItem";
import BarberItemAssign from "./BarberItemAssign";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";
import { SharedLoader } from "@/shared-components/SharedLoader";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import SearchInputComponent from "@/components/settings/SearchInputComponent";

const Barbers = () => {
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
    initialBarbers,
  } = useLocationBarber();
  const [search, setSearch] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const initialNumber = initialBarbers?.filter((item) => {
    if (item.flag === "T") {
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

  const filterResult = locationBarbersData.filter((item) => item.flag === "T");
  const allResult = locationBarbersData.filter((item) => item.flag !== "T");

  useEffect(() => {
    if (areListsEqual(initialNumber, filterResult)) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [locationBarbersData]);

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
  const filteredBarbers = allResult.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (isLoading === "getBarbers") {
    return <SharedLoader isOpen={isLoading === "getBarbers"} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerComponent}>
        <View style={styles.headerRow}>
          <TouchableOpacity hitSlop={20} onPress={router.back}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.pageTitleHeader}>
              {localization.BARBERS.listBarbers}
            </Text>
            <Text style={styles.addressHeader}>{itemData.address}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 2,
          marginVertical: 5,
          paddingHorizontal: 12,
          paddingBottom: 24,
        }}
      >
        <Text style={styles.addressBarbers}>
          {localization.SETTINGS.EMPLOYERSPLACES.barbersLength} (
          {filterResult.length})
        </Text>

        <FlatList
          data={filterResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BarberItemAssign item={item} toggleBarber={toggleBarber} />
          )}
        />
      </View>

      <View style={{ flex: 2, paddingHorizontal: 12, paddingBottom: 24 }}>
        <Text style={styles.addressBarbers}>
          {localization.SETTINGS.EMPLOYERSPLACES.availableBarbers} (
          {filteredBarbers.length})
        </Text>
        <View style={styles.searchInputContainer}>
          <SearchInputComponent search={search} setSearch={setSearch} />
        </View>
        <FlatList
          data={filteredBarbers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BarberItem item={item} toggleBarber={toggleBarber} />
          )}
        />
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <SharedButtonApproved
          onPress={() => submitChanges(id)}
          loading={isLoading === "post"}
          text={localization.SERVICES.saveChanges}
          disabled={disabledBtn}
        />
      </View>

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
};

const styles = StyleSheet.create({
  headerComponent: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 8,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderColor: "#1A1A1A",
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
    marginLeft: 10,
    justifyContent: "center",
  },
  pageTitleHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  addressHeader: {
    color: "#AAA",
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

  addressBarbers: {
    color: "#fff",
    fontSize: 17,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
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

export default withKeyboardAvoid(Barbers);
