import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const LocationItem = ({
  id,
  item,
  onSelectedLocation,
  selectedLocation,
  startEditing,
  deactivateLocation,
  undoHandler
}) => {
  const onSelectedHandler = (id, item) => {
    if (id) return;
    onSelectedLocation(item);
  };

  const displayValue =
    item.address.length > 35
      ? `${item.address.substring(0, 30)}...`
      : item.address;

  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.item, item.active === 0 && styles.deactivated]}
      onPress={() => onSelectedHandler(id, item)}
    >
      <Text
        style={[styles.address, item.active === 0 && styles.deactivatedText]}
      >
        {displayValue}
      </Text>
      <View style={{ flexDirection: "row", width: 100 }}>
        <TouchableOpacity onPress={() => startEditing(item)}>
          {item.active === 1 && (
            <Text style={styles.editHint}>
              <FontAwesome name="edit" size={24} color="white" />
            </Text>
          )}
        </TouchableOpacity>
        {item.active === 0 && (
          <TouchableOpacity onPress={() => undoHandler(item)}>
            <Text style={styles.undo}>
              <FontAwesome name="undo" size={24} color="grey" />
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => deactivateLocation(item)}>
          {item.active === 1 && (
            <Text style={styles.editHint}>
              <FontAwesome name="trash" size={24} color="white" />
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  address: {
    color: "white",
    padding: 10,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
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
  deactivated: {
    borderColor: "grey",
  },
  deactivatedText: {
    color: "#585858",
  },
  undo: {
    fontSize: 12,
    color: "#272626",
    padding: 8,
  },
});
export default LocationItem;
