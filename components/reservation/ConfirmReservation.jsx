import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SharedButton } from "@/shared-components/SharedButton";
import { post } from "@/api/apiService";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { useAppointment } from "@/contexts/AppointmentContext";
import Loader from "@/shared-components/Loader";
import ServiceItem from "../settings/assignments/barbersServices/components/ServiceItem";
import useServices from "../settings/services/hooks/useServices";
import Summary from "./Summary";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedDetailsServiceCard from "@/shared-components/SharedDetailsServiceCard";

function ConfirmReservation() {
  const [description, setDescription] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { getReservations } = useAppointment();
  const [selectedItem, setSelectedItem] = useState(null);
  // const [focused, setFocused] = useState(false)
  const { localization } = useLocalization();

  const {
    getServices,
    getServiceData,
    isLoading,
    chooseService,
    timesData,
    fetchTimes,
    setIsLoading,
  } = useServices();
  const params = useLocalSearchParams();
  const {
    name,
    email,
    phoneNumber,
    date,
    servicePrice,
    serviceId,
    serviceDuration,
    serviceImage,
    serviceNameEn,
    serviceNameLocal,
  } = params;

  const serviceData = {
    id: serviceId,
    name: { nameEn: serviceNameEn, nameLocal: serviceNameLocal },
    price: servicePrice,
    duration: serviceDuration,
    image: serviceImage,
  };

  useEffect(() => {
    if (date && serviceId && serviceDuration)
      fetchTimes(date, serviceId, serviceDuration);
  }, []);

  const generateStartDate = (date, selectedItem) => {
    const startDate = `${date}T${selectedItem.value}:00.000`;
    return new Date(startDate);
  };
  const generateEndDate = (date, selectedItem, serviceDuration) => {
    const startDate = new Date(`${date}T${selectedItem.value}:00.000`);

    return new Date(startDate.getTime() + serviceDuration * 60 * 1000);
  };



  const getDateFromString = (val) => {
    return val.toISOString().split("T")[0];
  };
  const cancelHandlercina = () => {
    setIsMessage(false);
    setError(null);
    router.back();
  };

  const refreshHandler = () => {
    setIsMessage(false);
    router.dismissAll(3);
    router.back();
  };
  const submitHandler = async () => {
    setIsLoading("post");
    const startDate = generateStartDate(date, selectedItem);
    const endDate = generateEndDate(date, selectedItem, serviceDuration);

    const data = {
      name,
      email,
      phoneNumber,
      serviceId,
      servicePrice,
      startDate,
      endDate,
      description,
    };

    try {
      const response = await post(
        `admin/availabilities/${new Date()}/createUser`,
        { data },
      );
      console.log("rs", response);
      if (response.status === 206) {
        setIsMessage(true);
        setError(localization.BARBERS.errorExist);
      }
      if (response.status === 201) {
        setIsMessage(true);
        setMessage(
          localization.APPOINTMENTS.approveReservation.createReservation,
        );
        await getReservations(getDateFromString(startDate));
      }
    } catch (err) {
      console.log("error", err);

      setIsMessage(true);

      setError(err);
    } finally {
      setIsLoading(null);
    }
  };
  console.log("isLoading",isLoading)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsBarber.light.background,
      }}
    >
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginLeft: 10, marginTop: 20 }}
      />
      <SharedCoverImage />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.TIMES.add}</Text>
      </View>

      <SharedDetailsServiceCard data={serviceData} />
      {isLoading === "times" && <Loader />}
      {timesData?.length > 0 && isLoading !== "times" && (
        <View style={{ maxHeight: 228, marginVertical: 20 }}>
          <Summary
            data={timesData}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        </View>
      )}
      {/* {selectedItem && (
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={styles.textInput}
            onChangeText={setDescription}
            value={description}
            placeholder={localization.SETTINGS.ABSENTHOURS.comment}
            placeholderTextColor={ColorsBarber.light.textColor}
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
            maxLength={170}
            scrollEnabled={false}
          />
        </View>
      )} */}
      {selectedItem && (
        <View style={{ paddingHorizontal: 20 }}>
          <SharedButton
            text={localization.ADDRESERVATION.add}
            onPress={submitHandler}
            loading={isLoading === "post"}
          />
        </View>
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={
            <FontAwesome
              name={error?.length > 0 ? "close" : "check-circle-o"}
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          onClose={error?.length > 0 ? cancelHandlercina : refreshHandler}
          onConfirm={error?.length > 0 ? cancelHandlercina : refreshHandler}
          buttonText="Ok"
          title={error || message}
        />
      )}
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

export default ConfirmReservation;
