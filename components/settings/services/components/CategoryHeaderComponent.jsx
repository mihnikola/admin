import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"
import { ColorsBarber } from "@/constants/Colors";

const CategoryHeaderComponent = ({ onPress, addServiceRouter, name, title }) => {
    return (
        <View style={styles.headerComponent}>
            <View style={styles.headerRow}>
                <TouchableOpacity hitSlop={20} onPress={onPress}>
                    <MaterialIcons
                        name="arrow-back"
                        size={25}
                        color={ColorsBarber.dark.textColor}
                    />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.pageTitleHeader}>
                        {title}
                    </Text>
                    <Text style={styles.addressHeader}>{name}</Text>
                </View>
                <TouchableOpacity onPress={addServiceRouter}>
                    <MaterialCommunityIcons
                        name="playlist-plus"
                        size={32}
                        color={ColorsBarber.dark.textColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    headerComponent: {
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 8,
        backgroundColor: ColorsBarber.dark.background,
        borderBottomWidth: 1,
        borderColor: "#1A1A1A",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    pageTitleHeader: {
        fontSize: 20,
        fontFamily: "OldStandard-Bold",
        color: ColorsBarber.dark.textColor,
        letterSpacing: 0.5,
    },
    addressHeader: {
        color: ColorsBarber.dark.inActiveTextColor,
        fontSize: 16,
        marginTop: 2,
        fontFamily: "OldStandard-Bold"
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
})
export default CategoryHeaderComponent;