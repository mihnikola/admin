import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";

const ServiceItem = ({ item, toggleService }) => {
    const { localization } = useLocalization();


    return (
        <TouchableOpacity style={styles.serviceItem} onPress={() => toggleService(item)}>
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ width: "52%", marginLeft: 10 }}>
                <View>
                    <Text style={styles.serviceText}>
                        {localization.code === "en"
                            ? item.name.nameEn
                            : item.name.nameLocal}
                    </Text>
                </View>
                <View>
                    <Text style={styles.serviceText}>{item.price} RSD</Text>
                </View>
                <View>
                    <Text style={styles.serviceText}>{item.duration} min</Text>
                </View>
            </View>
            <FontAwesome
                name={item.assigned && "check-circle-o"}
                size={28}
                color="white"
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    serviceItem: {
        backgroundColor: "#2a2a2a",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    serviceText: {
        color: "#fff",
        fontSize: 15,
    },
})

export default ServiceItem;