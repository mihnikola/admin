import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchInputComponent from "../settings/SearchInputComponent";
import { SharedButton } from "@/shared-components/SharedButton";
import useServices from "../settings/services/hooks/useServices";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useEmail from "../login/hooks/useEmail";
import { SharedInput } from "@/shared-components/SharedInput";
import usePhoneNumber from "../login/hooks/usePhoneNumber";

function AddReservation() {
  const { localization } = useLocalization();
  const [reservationName, setReservationName] = useState("");
  // const [reservationEmail, setReservationEmail] = useState("");
  const { getServices, getServiceData, isLoading, chooseService, timesData } =
    useServices();

  const { email, emailError, handleEmailChange, emailInputRef } = useEmail();
  const { date } = useLocalSearchParams();
  const emailLayoutRef = useRef();
  const passwordLayout = useRef(0);
  const phoneNumberRef = useRef();
  const phoneNumberLayout = useRef();
  const {
    phoneNumber,
    isValid,
    handlePhoneNumberChange,
    errorPhoneNumber,
    phoneNumberRefInput,
  } = usePhoneNumber();

  // const generateStartDate = (date, selectedItem) => {
  //   const startDate = `${date}T${selectedItem.value}:00.000`;
  //   return new Date(startDate);
  // };
  // const generateEndDate = (date, selectedItem, serviceDuration) => {
  //   const startDate = new Date(`${date}T${selectedItem.value}:00.000`);

  //   return new Date(startDate.getTime() + serviceDuration * 60 * 1000);
  // };
  const submitHandler = async () => {
    // const startDate = generateStartDate(date, selectedItem);
    // const serviceData = getServiceData.find((item) => item.assigned);
    // const endDate = generateEndDate(date, selectedItem, serviceData.duration);
    // console.log("serviceName", serviceData);
    router.push({
      pathname: "/(add_reservation)/addServiceItem",
      params: {
        name: reservationName,
        email,
        phoneNumber,
        date,
        // servicePrice: serviceData?.price,
        // serviceName:
        //   localization.code === "en"
        //     ? serviceData?.name?.nameEn
        //     : serviceData?.name?.nameLocal,
        // serviceId: serviceData?.id,
        // startDate,
        // endDate,
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
        paddingBottom: 50,
      }}
    >
      <ScrollView>
        <SharedBackButton
          onPress={router.back}
          styleBtn={{ marginLeft: 10, marginTop: 20 }}
        />
        <SharedCoverImage />
        <View style={styles.captureContainer}>
          <Text style={styles.capture}>Dodaj korisnika</Text>
        </View>
        <View style={{ padding: 20, gap: 10, paddingBottom: 20 }}>
          <SharedInput
            label="Naziv klijenta"
            value={reservationName}
            onChangeText={setReservationName}
            placeholder="Unesite naziv klijenta"
            onSubmitEditing={() => emailInputRef.current.focus()}
            autoCapitalize="none"
            style={styles.input}
            returnKeyType="next"
          />
          <View
            onLayout={(e) => {
              passwordLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <SharedInput
              label="Email klijenta"
              value={email}
              onChangeText={handleEmailChange}
              placeholder={localization.EMAIL.placeholder}
              onSubmitEditing={() => phoneNumberRef.current.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              ref={emailInputRef}
              error={emailError}
              returnKeyType="next"
            />
          </View>
          <View
            onLayout={(e) => {
              phoneNumberLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <SharedInput
              label="Broj telefona"
              value={phoneNumber}
              placeholderTextColor={ColorsBarber.light.inActiveTextColor}
              onChangeText={handlePhoneNumberChange}
              placeholder="06x xxx xxxx"
              keyboardType="phone-pad"
              dataDetectorTypes="phoneNumber"
              style={styles.input}
              error={errorPhoneNumber}
              ref={phoneNumberRef}
            />
          </View>
        </View>
        <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
          <SharedButton
            text="Nastavi"
            onPress={submitHandler}
            disabled={errorPhoneNumber?.length > 0 || emailError?.length > 0 || reservationName?.length === 0}
          />
        </View>
      </ScrollView>
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
