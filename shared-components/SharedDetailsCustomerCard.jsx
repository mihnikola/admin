import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const SharedDetailsCustomerCard = ({ user, note }) => {
  const { image, name, _id: id } = user;
  return (
    <View key={id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        {note && <Text style={styles.note}>{note}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dataContainer: {
    gap: 5,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  ratingContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  note: {
    fontSize: 14,
    color: "#CCCCCC",
  },
});

export default SharedDetailsCustomerCard;
