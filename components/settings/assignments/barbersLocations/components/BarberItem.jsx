import { FontAwesome } from "@expo/vector-icons";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BarberItem({ id, item, toggleBarber }) {
    const checkHandler = (item, id) => {
        if (id) return;
        toggleBarber(item);

    }
    return (
        <TouchableOpacity
            style={styles.barberItem}
            onPress={() => checkHandler(item, id)}
        >
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ width: "70%", marginLeft: 10 }}>
                <View>
                    <Text style={styles.barberText}>{item.name}</Text>
                </View>
                {item.phoneNumber && (
                    <View>
                        <Text style={styles.barberText}>{item.phoneNumber}</Text>
                    </View>
                )}

            </View>
            <View>

                <FontAwesome
                    name={item.flag === "T" && "check-circle-o"}
                    size={28}
                    color="white"
                />
            </View>

        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
    },
    barberItem: {
        backgroundColor: "#2a2a2a",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    barberText: {
        color: "#fff",
        fontSize: 15,
    },
});
