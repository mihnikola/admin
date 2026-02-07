// DoctorServicesScreen.js
import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DoctorServices = () => {
  const route = useRoute();
  const { doctorName, doctorServices, data } = route.params;

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() =>
        Alert.alert(
          item.title,
          `Price: ${item.title}\n\nWould you like to book this service?`
        )
      }
    >
      <View style={styles.containerLogoServices}>
        <Image style={styles.tinyImage} source={item.image} />
        <Text style={styles.serviceName}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.tinyLogo} source={data.img} />
      </View>
      {doctorServices && doctorServices.length > 0 ? (
        <FlatList
          data={doctorServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noServicesContainer}>
          <Text style={styles.noServicesText}>
            No services listed for this doctor.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLogoServices: {
    width: 140,
    textAlign: 'center',
    alignContent:'center',
    alignItems:'center'
  },
  containerLogo: {
    display: "flex",
    alignItems: "center",
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 20,
  },
  tinyImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    elevation: 3,
    width: 160,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Allow name to take available space
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF", // Distinct color for price
  },
  noServicesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noServicesText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default DoctorServices;
