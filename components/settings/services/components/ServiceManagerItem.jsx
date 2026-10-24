import { FontAwesome } from "@expo/vector-icons";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { ColorsBarber } from "@/constants/Colors";

const ServiceManagerItem = ({ startEditing, item }) => {
    return (
        <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => startEditing(item)}
        >
            <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ marginLeft: 10 }}>
                    <View>
                        <Text style={styles.serviceTextName}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.serviceText}>{item.price} RSD</Text>
                    </View>
                    <View>
                        <Text style={styles.serviceText}>{item.duration} min</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                    <Text style={styles.editHint}>
                        <FontAwesome
                            name="edit"
                            size={24}
                            color={ColorsBarber.dark.textColor}
                        />
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: ColorsBarber.dark.background,
    },
    searchInputContainer: {
        marginBottom: 10,
        marginHorizontal: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    image: {
        width: 75,
        height: 75,
    },
    subTitle: {
        fontSize: 18,
        color: ColorsBarber.dark.textColor,
        textAlign: "center",
        alignSelf: "center",
        alignItems: "center",
        width: "80%",
        fontFamily: "OldStandard-Bold",
    },
    input: {
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        fontFamily: "OldStandard-Bold",
    },

    cancelButton: {
        backgroundColor: "#525252",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    serviceItem: {
        backgroundColor: ColorsBarber.dark.item,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: ColorsBarber.dark.inActiveTextColor,
        padding: 20,
        borderRadius: 8,
        marginHorizontal: 12,
        marginBottom: 10,
    },
    serviceText: {
        color: ColorsBarber.dark.textColor,
        fontFamily: "OldStandard-Bold",
        fontSize: 15,
    },
    serviceTextName: {
        color: ColorsBarber.dark.textColor,
        fontFamily: "OldStandard-Bold",

        fontSize: 14,
        flexWrap: "wrap",
        flexShrink: 1,
        maxWidth: 200,
    },
    editHint: {
        fontSize: 12,
        color: "#aaa",
        padding: 8,
    },
});

export default ServiceManagerItem;
