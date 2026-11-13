import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { SharedButton } from "@/shared-components/SharedButton";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useLocalSearchParams } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";

function LocationRemove() {
  const { company } = useCompany();
  const { localization } = useLocalization();
  const [showToPicker, setShowToPicker] = useState(false);
  const [toTime, setToTime] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const params = useLocalSearchParams();
  const { id, type } = params;

  const removeLocationHandler = () => {};
  const onChangeTo = (event, selectedDate) => {
    setShowToPicker(Platform.OS === "ios");
    if (selectedDate) {
      setToTime(selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <SharedBackButton onPress={router.back} styleBtn={{ marginTop: 20 }} />
        <SharedTabHeader
          image={company?.media?.coverImageSettings}
          title={type === 'delete' ? localization.SETTINGS.removeLocation : localization.SETTINGS.deactivateLocation}
        />
        <Text style={styles.info}>
          {type === 'delete' ? localization.SETTINGS.infoPrimaryLocation : localization.SETTINGS.infoPrimaryDeactivateLocation}
        </Text>
        <Text style={styles.info}>
          {type === 'delete' ? localization.SETTINGS.infoSecondaryLocation :  ""}
        </Text>
      </View>
      <View style={[styles.btnContainer, type==="deactivate" && styles.deactivate]}>
        <SharedButton text={type==="deactivate" ? localization.PLACES.deactivateBtn : localization.PLACES.deleteBtn} onPress={removeLocationHandler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  btnContainer: {
    margin: 20,
  },
  deactivate:{
    flex: 0.18,
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
    marginHorizontal: 20,
  },
  info: {
   color:ColorsBarber.dark.textColor,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
  },
  dateLabel: {
   color:ColorsBarber.dark.textColor,
    paddingTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
});

export default LocationRemove;
