import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LocationItem = ({ id, item, onSelectedLocation, selectedLocation }) => {
    const onSelectedHandler = (id, item) => {
        if (id) return;
        onSelectedLocation(item);
    }
    console.log("item",item);
    console.log("id",id);
    
    return (
        <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => onSelectedHandler(id, item)}
        >
            <Text style={styles.address}>{item.address}</Text>
            <FontAwesome
                name={item.id === selectedLocation?.id && "check-circle-o"}
                size={28}
                color="white"
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    address: {
        color: "white",
        padding: 10
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