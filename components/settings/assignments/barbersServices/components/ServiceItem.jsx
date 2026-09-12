import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";

const ServiceItem = ({ item, toggleService }) => {
  const { localization } = useLocalization();

  return (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => toggleService(item)}
    >
      <View style={styles.servicePositionDeatils}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTextName}>
            {localization.code === "en"
              ? item.name.nameEn
              : item.name.nameLocal}
          </Text>
          <Text style={styles.serviceText}>{item.price} RSD</Text>
          <Text style={styles.serviceText}>{item.duration} MIN</Text>
        </View>
      </View>
      <View style={styles.actionButton}>
        {item.assigned && (
          <FontAwesome
            name="check-circle"
            size={32}
            color={ColorsBarber.light.textColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    backgroundColor: ColorsBarber.light.item,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    // Suptilna senka za Android
    elevation: 2,
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
    width: 75,
    height: 75,
    borderRadius: 20,
  },
  serviceInfo: {
    alignSelf: "center",
  },
  serviceText: {
    color: ColorsBarber.light.textColor,
  },
  serviceTextName: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    fontSize: 14,
    flexWrap: "wrap",
    flexShrink: 1,
    maxWidth: 200,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#85b2bd", // Akcentovana boja za dodavanje
  },
});

export default ServiceItem;
