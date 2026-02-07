import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropDownPicker from "./CustomDropDownPicker";
import useGetWorhHours from "./hooks/useGetWorkHours";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function TimeSettingsScreen() {
  const { localization } = useLocalization();
  const {
    getTimes,
    startWorkTime,
    endWorkTime,
    isLoading,
    error,
    minutesValue,
    message,
    isMessage,
    createWorkTimeAndSlots,
    setIsMessage,
    options,
    initialData
  } = useGetWorhHours();
  const [selected, setSelected] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTimes();
  }, []);
  useEffect(() => {
    if (minutesValue) {
      setSelected(minutesValue);
    }
  }, [minutesValue]);

  useEffect(() => {
    if (startWorkTime) {
      const [h, s] = startWorkTime.split(":").map(Number);
      setFromTime(new Date(0, 0, 0, h, s));
    }
  }, [startWorkTime]);

  useEffect(() => {
    if (endWorkTime) {
      const [h, s] = endWorkTime.split(":").map(Number);
      setToTime(new Date(0, 0, 0, h, s));
    }
  }, [endWorkTime]);

  useEffect(() => {
    if (minutesValue) {
      setSelected(minutesValue);
    }
  }, [minutesValue]);

  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    setShowFromPicker(Platform.OS === "ios");
    if (selectedDate) setFromTime(selectedDate);
  };

  const onChangeTo = (event, selectedDate) => {
    setShowToPicker(Platform.OS === "ios");
    if (selectedDate) setToTime(selectedDate);
  };

  // Formatiraj vreme u HH:mm
  const formatTime = (date) => {
    const h = date?.getHours().toString().padStart(2, "0");
    const m = date?.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };


  if (isLoading) {
    return <SharedLoader isOpen={isLoading} />;
  }

  const submitHandler = () => {
   
    if (formatTime(fromTime) === startWorkTime && formatTime(toTime) === endWorkTime && minutesValue === selected) { setIsError(true); return; }
    createWorkTimeAndSlots(formatTime(fromTime), formatTime(toTime), selected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localization.SETTINGS.WORKHOURS.capture}</Text>
      <Text style={styles.subtitle}>{localization.SETTINGS.WORKHOURS.subCapture}</Text>
      <View style={styles.containerData}>
        <View style={styles.row}>
          <Text style={styles.label}>{localization.SETTINGS.WORKHOURS.from}</Text>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.timeButton}
          >
            {fromTime && <Text style={styles.timeText}>{formatTime(fromTime)}</Text>}
            {!fromTime && <Text style={styles.timeText}>{localization.SETTINGS.WORKHOURS.startTimePlaceHolder}</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{localization.SETTINGS.WORKHOURS.to}</Text>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.timeButton}
          >
            {toTime && <Text style={styles.timeText}>{formatTime(toTime)}</Text>}
            {!toTime && <Text style={styles.timeText}>{localization.SETTINGS.WORKHOURS.endTimePlaceHolder}</Text>}
          </TouchableOpacity>
        </View>
      </View>
      {showFromPicker && (
        <DateTimePicker
          value={fromTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeFrom}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeTo}
        />
      )}

      <CustomDropDownPicker
        options={options}
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={selected || localization.SETTINGS.WORKHOURS.gap}
      />
      {fromTime && toTime &&
        <View style={{ marginTop: 40, gap: 10 }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {localization.SETTINGS.WORKHOURS.choosenWH}  {formatTime(fromTime)} - {formatTime(toTime)}
            </Text>
          </View>
          <View>
            {selected ? (
              <Text style={styles.selectedText}>{localization.SETTINGS.WORKHOURS.chooseGap} {selected} {localization.SETTINGS.WORKHOURS.minutes}</Text>
            ) : null}
          </View>
        </View>
      }
      {isMessage &&
        <SharedMessage
          isOpen={isMessage}
          onConfirm={() => setIsMessage(false)}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={message}
          buttonText="Ok"
        />
      }
      {isError &&
        <SharedMessage
          isOpen={isError}
          onConfirm={() => setIsError(false)}
          icon={
            <FontAwesome
              name={isError && "close"}
              size={64}
              color="white"
            />
          }
          title={message}
          buttonText="Ok"
        />
      }
      <SharedButton onPress={submitHandler} text={localization.SETTINGS.WORKHOURS.submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerData: {
    flex: 1,

  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
    color: "#919191",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: "white",
  },
  timeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffffff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#3f3f3fff",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 18,
    color: "#ffffffff",
    textAlign: "center",
  },

  selectedText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
