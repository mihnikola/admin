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
import { post } from "@/api/apiService";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { useAppointment } from "@/contexts/AppointmentContext";

function ConfirmReservation() {
  const [description, setDescription] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getReservations } = useAppointment();

  const params = useLocalSearchParams();
  const {
    name,
    email,
    phoneNumber,
    serviceName,
    servicePrice,
    serviceId,
    startDate,
    endDate,
  } = params;

  const getDateFromString = (val) => {
    console.log("val", val);
    return val.split("T")[0];
  };

  const refreshHandler = () => {
    setIsMessage(false);
    router.dismissAll(2);
    router.back();
  };
  const submitHandler = async () => {
    setIsLoading(true);
    const startDateValue = new Date(startDate).toISOString();
    const endDateValue = new Date(endDate).toISOString();
    const data = {
      name,
      email,
      phoneNumber,
      serviceName,
      serviceId,
      servicePrice,
      startDate: startDateValue,
      endDate: endDateValue,
      description,
    };

    try {
      const response = await post(
        `admin/availabilities/${new Date()}/createUser`,
        { data },
      );
      if (response.status === 201) {
        setIsMessage(true);
        setMessage("A bravo ti ga bravo");
        await getReservations(getDateFromString(startDateValue));
      }
    } catch (err) {
      setIsMessage(true);

      setError(err);

      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsBarber.light.background,
        paddingTop: 75,
      }}
    >
      <SharedBackButton
        onPress={router.back}
        styleBtn={{ marginLeft: 10, marginTop: 20 }}
      />

      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setDescription}
          value={description}
          placeholder="Dodaj komentar"
          placeholderTextColor={ColorsBarber.light.textColor}
          multiline={true}
          numberOfLines={8}
          textAlignVertical="top"
          maxLength={170}
          scrollEnabled={false}
        />
      </View>
      <View>
        <SharedButton
          text="Dodaj rezervaciju"
          onPress={submitHandler}
          loading={isLoading}
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
