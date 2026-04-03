import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LocationItem = ({ item, onSelectedLocation, selectedLocation }) => {
  const onSelectedHandler = (item) => {
    onSelectedLocation(item);
  };

  return (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() => onSelectedHandler(item)}
    >
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  address: {
    color: "white",
    padding: 10,
  },
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
    marginVertical: 9,
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
export default LocationItem;
