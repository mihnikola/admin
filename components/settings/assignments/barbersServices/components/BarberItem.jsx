import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BarberItem({ id, item, assignmentHandler }) {
    const checkHandler = (item, id) => {
        if (id) return;
        assignmentHandler(item);

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
