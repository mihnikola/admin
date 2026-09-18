import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchInputComponent from "../settings/SearchInputComponent";
import { SharedButton } from "@/shared-components/SharedButton";
import useServices from "../settings/services/hooks/useServices";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useEmail from "../login/hooks/useEmail";
import { SharedInput } from "@/shared-components/SharedInput";
import usePhoneNumber from "../login/hooks/usePhoneNumber";
import ServiceItem from "../settings/assignments/barbersServices/components/ServiceItem";
import Loader from "@/shared-components/Loader";

function ChooseServiceItem() {
  const { localization } = useLocalization();
  const { getServices, getServiceData, isLoading, chooseService, chooseOne } =
    useServices();
  const { date, name, phoneNumber, email } = useLocalSearchParams();
  const submitHandler = async () => {
    router.push({
      pathname: "/(add_reservation)/confirmReservation",
      params: {
        name,
        email,
        phoneNumber,
        date,
        servicePrice: chooseOne?.price,
        serviceName:
          localization.code === "en"
            ? chooseOne?.name?.nameEn
            : chooseOne?.name?.nameLocal,
        serviceId: chooseOne?.id,
        serviceDuration: chooseOne?.duration,
      },
    });
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
        justifyContent: "space-between",
      }}
    >
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginLeft: 10, marginTop: 20 }}
      />
      <SharedCoverImage />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>Izaberi uslugu</Text>
      </View>
      {isLoading === "get" && <Loader />}
      {isLoading !== "get" && (
        <View style={styles.display}>
          <FlatList
            data={getServiceData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ServiceItem item={item} toggleService={chooseService} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }} // Obezbeđuje da se poslednji item lepo vidi iznad dugmeta
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {chooseOne && (
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <SharedButton text="Nastavi" onPress={submitHandler} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maxHeight: {
    maxHeight: 500,
  },
  display: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20, 
  },
  container: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: ColorsBarber.light.background,
  },
  input: {
    backgroundColor: "white",
    color: ColorsBarber.light.item,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: ColorsBarber.light.item,
    fontFamily: "OldStandard-Bold", // Ključ iz useFonts
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
  text: {
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.light.textColor,
  },
  captureContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
    paddingLeft: 20,
  },
  capture: {
    fontSize: 32,
    color: ColorsBarber.light.textColor,
    fontWeight: "500",
    fontFamily: "OldStandard-Bold",
  },
});

export default ChooseServiceItem;
