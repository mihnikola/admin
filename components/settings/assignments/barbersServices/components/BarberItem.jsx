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
                {item.seniority && (
                    <View>
                        <Text style={styles.barberText}>{item.seniority.title}</Text>
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
        backgroundColor: "#000000",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "white",
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    barberText: {
        color: "#fff",
        fontSize: 15,
    },
});
