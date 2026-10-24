import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";

const CategoryItem = ({ item, checkHandler, startEditing, selectedItem }) => {
    const { localization } = useLocalization();
    return (
        <View style={styles.serviceItem}>
            <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
                <TouchableOpacity onPress={() => checkHandler(item)}>
                    <FontAwesome
                        name={
                            selectedItem?._id === item?._id
                                ? "check-circle"
                                : "circle-o"
                        }
                        size={28}
                        color={ColorsBarber.dark.textColor}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.serviceTextName}>{localization.code === 'en' ? item.name.nameEn : item.name.nameLocal}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.editHint}
                onPress={() => startEditing(item)}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <FontAwesome
                    name="edit"
                    size={28}
                    color={ColorsBarber.dark.textColor}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    serviceItem: {
        backgroundColor: ColorsBarber.dark.item,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: ColorsBarber.dark.inActiveTextColor,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 12,
        marginBottom: 10,
        alignContent: "center",
        alignItems: "center",
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
});

export default CategoryItem;