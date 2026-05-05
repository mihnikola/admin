import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SharedButton } from "@/shared-components/SharedButton";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import useBarbers from "../hooks/useBarbers";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";

function BarberDelete() {
  const { company } = useCompany();
  const { localization } = useLocalization();
  const [showToPicker, setShowToPicker] = useState(false);
  const [toTime, setToTime] = useState(new Date());
  const params = useLocalSearchParams();
  const { id } = params;
  const { removeBarber, isLoading, isMessage, message } = useBarbers();

  const removeBarberHandler = () => {
    const localeTimeDate = toTime.toLocaleDateString("en-GB", {
      timeZone: "Europe/Belgrade",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const [day, month, year] = localeTimeDate.split("/");
    const resultDate = `${year}-${month}-${day}`;
    const putData = {
      id,
      firedDate: resultDate,
    };
    removeBarber(putData);
  };
  const onChangeTo = (event, selectedDate) => {
    setShowToPicker(Platform.OS === "ios");
    console.log(selectedDate);
    if (selectedDate) {
      setToTime(selectedDate);
    }
  };
  const confirmMessageHandler = () => {
    router.dismissAll(2);
    router.push("/(tabs)/(03_settings)/barbers");
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <SharedBackButton onPress={router.back} styleBtn={{ marginLeft: 10, marginTop: 20 }} />

        <SharedTabHeader
          image={company?.media?.coverImageSettings}
          title={localization.SETTINGS.removeBarber}
        />
        <Text style={styles.info}>{localization.SETTINGS.infoPrimary}</Text>
        <Text style={styles.info}>{localization.SETTINGS.infoSecondary}</Text>
        <Text style={styles.dateLabel}>{localization.SETTINGS.dateLabel}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowToPicker(true)}
        >
          <Text style={styles.dateText}>
            {toTime.toLocaleDateString("en-GB", {
              timeZone: "Europe/Belgrade",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
        {showToPicker && (
          <DateTimePicker
            value={toTime}
            mode="date"
            display="spinner"
            timeZoneName="Europe/Belgrade"
            onChange={onChangeTo}
          />
        )}
      </View>
      <View style={styles.btnContainer}>
        <SharedButtonRejected
          onPress={removeBarberHandler}
          loading={isLoading === "remove"}
          text={localization.BARBERS.removeBtn}
        />
      </View>
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={confirmMessageHandler}
          onConfirm={confirmMessageHandler}
          buttonText="Ok"
          title={message}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  btnContainer: {
    flex: 0.1,
    margin: 30,

  },
  buttonRmv: {
    backgroundColor: "rgb(129, 29, 29)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    margin: 30,
  },
  info: {
    color: "white",
    padding: 10,
    margin: 20,
    fontSize: 20,
    textAlign: "center",
  },
  dateLabel: {
    color: "white",
    paddingTop: 10,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
});

export default BarberDelete;
