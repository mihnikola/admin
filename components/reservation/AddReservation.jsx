import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchInputComponent from "../settings/SearchInputComponent";
import { SharedButton } from "@/shared-components/SharedButton";
import useServices from "../settings/services/hooks/useServices";
import ServiceItem from "../settings/assignments/barbersServices/components/ServiceItem";
import Summary from "./Summary";
import Loader from "@/shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";

function AddReservation() {
  const { localization } = useLocalization();
  const [reservationName, setReservationName] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { getServices, getServiceData, isLoading, chooseService, timesData } =
    useServices();
  const [selectedItem, setSelectedItem] = useState(null);

  const { date } = useLocalSearchParams();

  const generateStartDate = (date, selectedItem) => {
    const startDate = `${date}T${selectedItem.value}:00.000`;
    return new Date(startDate);
  };
  const generateEndDate = (date, selectedItem, serviceDuration) => {
    const startDate = new Date(`${date}T${selectedItem.value}:00.000`);

    return new Date(startDate.getTime() + serviceDuration * 60 * 1000);
  };
  const submitHandler = async () => {
    const startDate = generateStartDate(date, selectedItem);
    const serviceData = getServiceData.find((item) => item.assigned);
    const endDate = generateEndDate(date, selectedItem, serviceData.duration);
    console.log("serviceName", serviceData);
    router.push({
      pathname: "/(add_reservation)/confirmReservation",
      params: {
        name: reservationName,
        email: reservationEmail,
        phoneNumber,
        servicePrice: serviceData?.price,
        serviceName:
          localization.code === "en"
            ? serviceData?.name?.nameEn
            : serviceData?.name?.nameLocal,
        serviceId: serviceData?.id,
        startDate,
        endDate,
      },
    });
    // console.log("description", description);
    // console.log("date", date);
    // console.log("selectedItem", serviceData);
    // console.log("serviceId", serviceId);

    // const data = {
    //   name: reservationName,
    //   email: reservationEmail,
    //   phoneNumber,

    //   serviceId,
    //   description,
    // };

    // try {
    //   const response = await post(
    //     `/admin/availabilities/${new Date()}/createUser`,
    //     { data },
    //   );
    //   console.log("response", response);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };
  useEffect(() => {
    if (date) {
      getServices(date);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsBarber.light.background,
        padding: 20,
        paddingTop: 75,
      }}
    >
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginLeft: 10, marginTop: 20 }}
      />
      <View style={{ gap: 20 }}>
        <SearchInputComponent
          search={reservationName}
          setSearch={setReservationName}
          placeholderText="Dodaj ime klijenta"
        />
        <SearchInputComponent
          search={reservationEmail}
          setSearch={setReservationEmail}
          placeholderText="Opciono polje / Email klijenta"
        />
        <SearchInputComponent
          search={phoneNumber}
          setSearch={setPhoneNumber}
          placeholderText="Opciono polje / Broj telefona"
        />
      </View>
      <View style={{ maxHeight: 250, paddingTop: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: ColorsBarber.light.textColor,
            fontFamily: "OldStandard-Regular",
          }}
        >
          Lista usluga
        </Text>
        {isLoading === "get" && <Loader />}
        <FlatList
          data={getServiceData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ServiceItem item={item} toggleService={chooseService} />
          )}
        />
      </View>
      {isLoading === "times" && <Loader />}
      {timesData?.length > 0 && (
        <Summary
          data={timesData}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}

      <View style={{ paddingBottom: 20 }}>
        <SharedButton text="Nastavi" onPress={submitHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: ColorsBarber.light.background,
  },
  textInput: {
    marginTop: 10,
    minHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Regular",
    borderWidth: 1,
    borderColor: ColorsBarber.light.textColor,
  },

  content: {
    width: 80,
    height: 50,
    justifyContent: "center",
    borderColor: ColorsBarber.light.inActiveTextColor,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedTime: {
    color: ColorsBarber.light.textColor,
  },
  selectedContent: {
    backgroundColor: ColorsBarber.light.item,
  },
  time: {
    fontSize: 16,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    borderColor: "#ffffff",
  },
});

export default AddReservation;
