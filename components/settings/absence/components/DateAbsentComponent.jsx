import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";
import DatePickerModal from './DatePickerModal';
function DateAbsentComponent({
  setShowDate,
  date,
  showDate,
  onDateChange,
  placeholder,
}) {
  const { localization } = useLocalization();
  const locale = localization.code === "sr" ? "sr-Latn-RS" : "en-GB";
  const [tempDate, setTempDate] = useState(date || new Date());

  const datePart = date ? new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date)) : "";


  useEffect(() => {
    if (showDate) {
      setTempDate(date || new Date());
    }
  }, [showDate]);

  const handleConfirmIOS = () => {
    const fakeEvent = { type: "set" };
    onDateChange(fakeEvent, tempDate);
    setShowDate(false);
    // onDateChange(null, tempDate);
    // setShowDate(false);
  };

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDate(false);
      if (event.type === "set" && selectedDate) {
        onDateChange(event, selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDate(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateText}>{datePart || placeholder}</Text>
        </TouchableOpacity>
      </View>

      {showDate && Platform.OS === "android" && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
      {showDate && Platform.OS === "ios" && (
        <DatePickerModal tempDate={tempDate} handleConfirmIOS={handleConfirmIOS} handleChange={handleChange} setShowDate={setShowDate} showDate={showDate} />
      )}
    </>
  );
}

const styles = StyleSheet.create({

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centriramo sadržaj (ili 'space-between' ako imaš ikonicu)
    height: 40,               // Fiksna visina (prilagodi po želji, npr. 45, 50, 55)
    width: "100%",            // Ili fiksna širina u pikselima, npr. 250, ali width: "100%" uz marginHorizontal lepo popunjava kolonu
    paddingHorizontal: 10,
    backgroundColor: ColorsBarber.dark.item,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    borderRadius: 15,
  },
  dateText: {
    fontSize: 15,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
    textAlign: "center",     
  },
});

export default DateAbsentComponent;
