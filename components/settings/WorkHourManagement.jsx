import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropDownPicker from "./CustomDropDownPicker";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedQuestion } from "../../shared-components/SharedQuestion";
import TimePickerModal from "./TimePickerModal";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import SharedButtonDeactivate from "@/shared-components/SharedButtonDeactivate";
import SharedButtonActivate from "@/shared-components/SharedButtonActivate";
export default function TimeSettingsScreen({
  isLoading,
  deactivate,
  deleteLocation,
  activateLocation,
  minutes,
  workHours,
  active,
  id,
  submitEverything,
  streetName,
  data,
  city,
}) {
  const { localization } = useLocalization();

  const options = [
    { label: `10 ${localization.SETTINGS.WORKHOURS.minutes}`, value: 10 },
    { label: `15  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 15 },
    { label: `20  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 20 },
    { label: `30  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 30 },
    { label: `40  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 40 },
    { label: `45  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 45 },
    { label: `50  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 50 },
    { label: `60  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 60 },
  ];

  const [selected, setSelected] = useState(10);
  const [isRemove, setIsRemove] = useState(false);
  const [isDeactivate, setIsDeactivate] = useState(false);
  const [toTime, setToTime] = useState(workHours?.end);
  const [fromTime, setFromTime] = useState(workHours?.start);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [isUndo, setIsUndo] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [error, setError] = useState(null);

  const removeHandler = () => {
    setIsRemove(true);
  };
  const removeCancelHandler = () => {
    setIsRemove(false);
  };
  const removeConfirmHandler = async (id) => {
    setIsRemove(false);
    await deleteLocation(id);
  };

  const undoHandler = () => {
    setIsUndo(true);
  };
  const undoCancelHandler = () => {
    setIsUndo(false);
  };
  const undoConfirmlHandler = async (id) => {
    setIsUndo(false);
    await activateLocation(id);
  };

  const deactiveHandler = () => {
    setIsDeactivate(true);
    // router.push({
    //   pathname: "/(tabs)/(03_settings)/removeLocation",
    //   params: { id, type: "deactivate" },
    // });
  };

  const deactivateCancelHandler = () => {
    setIsDeactivate(false);
  };
  const deactivateConfirmHandler = async (id) => {
    setIsDeactivate(false);
    await deactivate(id);
  };
  const checkValidationAddress = (x) => {
    if (!x || typeof x !== "string") return "";

    if (!x.includes(",")) return x;

    return x.split(",")[0];
  };
  const verificationData = () => {
    if (
      checkValidationAddress(data?.address) ==
        checkValidationAddress(streetName) &&
      data.workingHours.start == fromTime &&
      data.workingHours.end == toTime &&
      data.slotDuration == selected
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };

  const onChangeFrom = (selectedDate) => {
    setShowFromPicker(Platform.OS === "ios");
    setFromTime(selectedDate);
  };

  const onChangeTo = (selectedDate) => {
    setShowToPicker(Platform.OS === "ios");
    setToTime(selectedDate);
  };

  const isValidTimeRange = (startTime, endTime) => {
    if (!startTime || !endTime) return false;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (startTotal >= endTotal) {
      return false;
    }

    return true;
  };

  const submitHandler = () => {
    if (isValidTimeRange(fromTime, toTime)) {
      const dataData = {
        open: fromTime,
        close: toTime,
        minutes: selected,
      };
      submitEverything(dataData);
    } else {
      setError(localization.SETTINGS.ABSENTHOURS.error);
    }
  };
  useEffect(() => {
    if (minutes) {
      setSelected(minutes);
    }
  }, [minutes]);

  useEffect(() => {
    verificationData();
  }, [selected, fromTime, toTime, streetName]);

  if (isLoading === "get") {
    return <SharedLoader isOpen={isLoading === "get"} />;
  }

  return (
    <View style={styles.containerEdit}>
      <Text style={styles.title}>
        {localization.SETTINGS.WORKHOURS.capture}
      </Text>
      <View style={styles.containerData}>
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={24} color="grey" />

          <Text style={styles.label}>
            {localization.SETTINGS.WORKHOURS.from}
          </Text>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.timeButton}
          >
            {fromTime && <Text style={styles.timeText}>{fromTime}</Text>}
            {!fromTime && (
              <Text style={styles.timeText}>
                {localization.SETTINGS.WORKHOURS.startTimePlaceHolder}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <FontAwesome name="clock-o" size={24} color="grey" />
          <Text style={styles.label}>{localization.SETTINGS.WORKHOURS.to}</Text>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.timeButton}
          >
            {toTime && <Text style={styles.timeText}>{toTime}</Text>}
            {!toTime && (
              <Text style={styles.timeText}>
                {localization.SETTINGS.WORKHOURS.endTimePlaceHolder}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TimePickerModal
        visible={showFromPicker}
        value={workHours?.start}
        startValue="00:00"
        endValue="23:50"
        interval={30}
        setVisible={setShowFromPicker}
        onCancel={() => setShowFromPicker(false)}
        onConfirm={onChangeFrom}
      />
      <TimePickerModal
        visible={showToPicker}
        value={workHours?.end}
        startValue="00:00"
        endValue="23:50"
        interval={30}
        setVisible={setShowToPicker}
        onCancel={() => setShowToPicker(false)}
        onConfirm={onChangeTo}
      />

      <Text style={styles.subtitle}>
        {localization.SETTINGS.WORKHOURS.subCapture}
      </Text>

      <CustomDropDownPicker
        options={options}
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={selected || localization.SETTINGS.WORKHOURS.gap}
      />

      <View style={{ flex: !id ? 0.4 : 1.5, gap: 10 }}>
        <SharedButton
          loading={isLoading === "addEdit"}
          disabled={disabledBtn}
          onPress={submitHandler}
          text={localization.SETTINGS.WORKHOURS.submit}
          margin
        />
        {id && (
          <SharedButtonRejected
            onPress={removeHandler}
            loading={isLoading === "remove"}
            text={localization.PLACES.deleteBtn}
          />
        )}
        {active === 1 && (
          <SharedButtonDeactivate
            onPress={deactiveHandler}
            loading={isLoading === "deactivate"}
            text={localization.PLACES.deactivateBtn}
          />
        )}
        {active === 0 && (
          <SharedButtonActivate
            onPress={undoHandler}
            loading={isLoading === "activate"}
            text={localization.PLACES.undo}
          />
        )}
      </View>

      {isRemove && (
        <SharedQuestion
          isOpen={isRemove}
          onClose={removeCancelHandler}
          onLogOut={() => removeConfirmHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.deleteQuestion}
          buttonTextYes={localization.PLACES.deleteBtn}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {isDeactivate && (
        <SharedQuestion
          isOpen={isDeactivate}
          onClose={deactivateCancelHandler}
          onLogOut={() => deactivateConfirmHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.deactivateQuestion}
          buttonTextYes={localization.PLACES.deactivateBtn}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {isUndo && (
        <SharedQuestion
          isOpen={isUndo}
          onClose={undoCancelHandler}
          onLogOut={() => undoConfirmlHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.questionActivate}
          buttonTextYes={localization.PLACES.undo}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {/* {isMessage && (
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
      )} */}
      {error?.length > 0 && (
        <SharedMessage
          isOpen={error?.length > 0}
          onConfirm={() => setError(null)}
          icon={<FontAwesome name="close" size={64} color="white" />}
          title={error}
          buttonText="Ok"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerData: {
    flex: 1,
  },
  container: {
    flex: 2,
    backgroundColor: "#000",
    marginHorizontal: 10,
  },
  containerEdit: {
    flex: 4,
    marginHorizontal: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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
    textAlign: "center",
    color: "#919191",
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: "white",
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "rgb(0, 0, 0)",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "rgb(48, 48, 48)",
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
  buttonRmv: {
    backgroundColor: "rgb(129, 29, 29)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonDeactive: {
    backgroundColor: "rgb(179, 172, 172)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonUndo: {
    backgroundColor: "rgb(148, 148, 148)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
});
