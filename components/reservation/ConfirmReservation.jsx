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

function ConfirmReservation() {
  const [description, setDescription] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getReservations } = useAppointment();
  const [selectedItem, setSelectedItem] = useState(null);
  const [focusing, setFocusing] = useState(false);

  const { localization } = useLocalization();

  const {
    getServices,
    getServiceData,
    isLoading: isLoadingServices,
    chooseService,
    timesData,
  } = useServices();
  const params = useLocalSearchParams();
  const { name, email, phoneNumber, date } = params;

  const generateStartDate = (date, selectedItem) => {
    const startDate = `${date}T${selectedItem.value}:00.000`;
    return new Date(startDate);
  };
  const generateEndDate = (date, selectedItem, serviceDuration) => {
    const startDate = new Date(`${date}T${selectedItem.value}:00.000`);

    return new Date(startDate.getTime() + serviceDuration * 60 * 1000);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (date) {
      getServices(date);
    }
  }, []);

  const getDateFromString = (val) => {
    return val.toISOString().split("T")[0];
  };

  const refreshHandler = () => {
    setIsMessage(false);
    router.dismissAll(2);
    router.back();
  };
  const submitHandler = async () => {
    setIsLoading(true);
    const startDate = generateStartDate(date, selectedItem);
    const serviceData = getServiceData.find((item) => item.assigned);
    const endDate = generateEndDate(date, selectedItem, serviceData.duration);
    
    const data = {
      name,
      email,
      phoneNumber,
      serviceId: serviceData?.id,
      servicePrice: serviceData?.price,
      startDate,
      endDate,
      description,
    };

    try {
      const response = await post(
        `admin/availabilities/${new Date()}/createUser`,
        { data },
      );
      if (response.status === 201) {
        setIsMessage(true);
        setMessage(
          localization.APPOINTMENTS.approveReservation.createReservation,
        );
        await getReservations(getDateFromString(startDate));
      }
    } catch (err) {
      setIsMessage(true);

      setError(err);

      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setFocusing(false);
      inputRef.current?.blur();
    });

    return () => {
      keyboardSubscription.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsBarber.light.background,
        paddingTop: 75,
        paddingHorizontal: 20,
      }}
    >
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginLeft: 10, marginTop: 20 }}
      />
      {!focusing && (
        <View style={{ maxHeight: 250, paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: ColorsBarber.light.textColor,
              fontFamily: "OldStandard-Regular",
            }}
          >
            Odaberite uslugu
          </Text>
          {isLoadingServices === "get" && <Loader />}
          <FlatList
            data={getServiceData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ServiceItem item={item} toggleService={chooseService} />
            )}
          />
        </View>
      )}
      {isLoadingServices === "times" && <Loader />}
      {timesData?.length > 0 && (
        <View style={{ maxHeight: 200 }}>
          <Text
            style={{
              fontSize: 20,
              color: ColorsBarber.light.textColor,
              fontFamily: "OldStandard-Regular",
            }}
          >
            Izaberite vreme
          </Text>
          <Summary
            data={timesData}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        </View>
      )}
      {selectedItem && (
        <View>
          <TextInput
            onFocus={() => setFocusing(true)}
            onBlur={() => setFocusing(false)}
            style={styles.textInput}
            ref={inputRef}
            onChangeText={setDescription}
            value={description}
            placeholder="Dodaj boju"
            placeholderTextColor={ColorsBarber.light.textColor}
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
            maxLength={170}
            scrollEnabled={false}
          />
        </View>
      )}
      {selectedItem && (
        <View>
          <SharedButton
            text="Dodaj rezervaciju"
            onPress={submitHandler}
            loading={isLoading}
          />
        </View>
      )}
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
          onClose={refreshHandler}
          onConfirm={refreshHandler}
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
