import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import useLocationBarber from './hooks/useLocationBarber';
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedButton } from "@/shared-components/SharedButton";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";

const LocationComponent = () => {
  const { localization } = useLocalization();
  const { onSelectedLocation, isLoading, error, isMessage, message, setIsMessage, locationBarbersData, locations, toggleBarber, submitChanges, selectedLocation, confirmSubmit } = useLocationBarber();





  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header Icons */}
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", marginTop: 10 }}>
          <FontAwesome5 name="male" size={35} color="white" />
          <FontAwesome5 name="search-location" size={35} color="white" />
        </View>
        {/* Choose Location Section */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white", marginBottom: 10, textAlign: 'center' }}>
            Choose location
          </Text>
          <View style={{ maxHeight: 160 }}>
            {isLoading === "getLocations" && <Loader isOpen={isLoading === "getLocations"} />}
            <ScrollView>
              {isLoading !== "getLocations" && locations.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  onPress={() => onSelectedLocation(item)}
                >
                  <Text style={{ color: "white", padding: 10 }}>{item.address}</Text>
                  <FontAwesome
                    name={item.id === selectedLocation?.id && "check-circle-o"}
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

    
      </ScrollView>

      {locationBarbersData?.length > 0 &&
        <View style={{ paddingBottom: 5, marginHorizontal: 20 }}>
          <SharedButton
            loading={isLoading === 'post'}
            onPress={submitChanges}
            text={localization.SETTINGS.EMPLOYERSPLACES.submit}
          />
        </View>
      }

      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={confirmSubmit}
          onConfirm={confirmSubmit}
          buttonText="Ok"
          title={message}
        />
      )}
    </View >
  );
};
const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  item: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
  },
  itemBarber: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
  },
});
export default LocationComponent;
