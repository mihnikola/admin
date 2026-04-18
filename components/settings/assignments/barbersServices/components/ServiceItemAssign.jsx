import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";

const ServiceItemAssign = ({ item, toggleService }) => {
  const { localization } = useLocalization();

  return (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => toggleService(item)}
    >
      <View style={styles.servicePositionDeatils}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceText}>
            {localization.code === "en"
              ? item.name.nameEn
              : item.name.nameLocal}
          </Text>
          <Text style={styles.serviceText}>{item.price} RSD</Text>
          <Text style={styles.serviceText}>{item.duration} MIN</Text>
        </View>
      </View>
      <View style={styles.centerCheckMark}>
        <FontAwesome name="close" size={25} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   serviceItem: {
    backgroundColor: "#7c7a7a",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  centerCheckMark: {
    justifyContent: "center",
  },
  servicePositionDeatils: {
    gap: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  serviceInfo: {
    alignSelf: "center",
  },
  serviceText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default ServiceItemAssign;
