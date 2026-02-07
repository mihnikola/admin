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
import useServiceBarber from './hooks/useServiceBarber';
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedButton } from "@/shared-components/SharedButton";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";

const AssignServicesScree = () => {
  const { localization } = useLocalization();
  const { onSelectedBarber, isLoading, error, isMessage, message, setIsMessage, barberServicesData, services, toggleService, barbers, submitChanges, selectedBarber, confirmSubmit } = useServiceBarber();


console.log("barberServicesDatasadasda",barberServicesData)


  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header Icons */}
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", marginTop: 10 }}>
          <FontAwesome5 name="male" size={35} color="white" />
          <FontAwesome5 name="search-location" size={35} color="white" />
        </View>
        {/* Choose Barber Section */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white", marginBottom: 10 }}>
            Choose barbers
          </Text>
          <View style={{ maxHeight: 160 }}>
            {isLoading === "getBarbers" && <Loader isOpen={isLoading === "getBarbers"} />}
            <ScrollView>
              {isLoading !== "getBarbers" && barbers.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.item}
                  onPress={() => onSelectedBarber(item)}
                >
                  {item.image && <Image source={{ uri: item.image }} style={styles.profileImage} />}
                  <Text style={{ color: "white", padding: 10 }}>{item.name}</Text>
                  <FontAwesome
                    name={item._id === selectedBarber?._id && "check-circle-o"}
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Choose Barber Section */}
        {isLoading === "getServices" && <Loader isOpen={isLoading === "getServices"} />}

        {isLoading !== "getServices" && barberServicesData?.length > 0 && (
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              Choose barber
            </Text>
            <View style={{ maxHeight: 250, marginTop: 15, marginHorizontal: 20 }}>
              <ScrollView showsVerticalScrollIndicator>
                {barberServicesData && barberServicesData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleService(item)}
                    style={styles.itemBarber}
                  >
                    {item.image && <Image source={{ uri: item.image }} style={styles.profileImage} />}
                    <View>
                      <Text style={{ color: 'white' }}> {item.name}</Text>
                      {item.phoneNumber && <Text style={{ color: 'white' }}> {item.phoneNumber}</Text>}
                    </View>
                    <FontAwesome
                      name={item.flag === 'T' && "check-circle-o"}
                      size={28}
                      color="white"
                    />
                  </TouchableOpacity>
                )
                )}
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>

      {barberServicesData?.length > 0 &&
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
export default AssignServicesScree;
