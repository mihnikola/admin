import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { roundValue } from "@/helpers";


const SharedDetailsEmployerCard = ({ data }) => {
  const { _id, image, name, averageRating, userCount, seniority } = data;


  return (
    <View key={_id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{seniority?.title || seniority}</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name={"star"} size={16} color="#FFD700" />
            <Text style={styles.reviewText}>{`${roundValue(
              averageRating
            )}/5`}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name={"person"} size={16} color="#FFD700" />
            <Text style={styles.reviewText}>{userCount || 0}</Text>
          </View>
        </View>
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

  reviewText: {
    fontSize: 14,
    color: "#CCCCCC",
  },
});

export default SharedDetailsEmployerCard;
