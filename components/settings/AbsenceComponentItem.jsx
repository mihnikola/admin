import { useLocalization } from "@/contexts/LocalizationContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateFormatComponent from './../../components/home/components/DateFormatComponent';

const AbsenceComponentItem = ({ item }) => {
    const { localization } = useLocalization();
    console.log("item", item)
    // const goToScreen = (item) => {
    //     router.push({
    //         pathname: "/(reservation_notification)/",
    //         params: {
    //             itemId: item?.id,
    //             user: item?.user?.name,
    //             note: item?.description,
    //             requirement: true,
    //         },
    //     });
    // };



    return (
        <TouchableOpacity
            key={item.id}
            style={styles.eventItem}
        // onPress={() => goToScreen(item)}
        >
            <View style={styles.timeBlock}>
                <DateFormatComponent item={item} />
            </View>
            <View style={styles.detailsBlock}>
                {/* <Text style={styles.eventTitle}>
                    {localization.code === "en" ? item.name.nameEn : item.name.nameLocal}
                </Text>
               

               */}
            </View>
            <View style={styles.status}>
                <FontAwesome size={25} color="white" name="clock-o" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    status: {
        alignSelf: "baseline",
    },
    eventItem: {
        flexDirection: "row",
        backgroundColor: "#262626ff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        shadowColor: "#262626ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
    },
    timeBlock: {
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "#eee",
        paddingRight: 15,
    },
    startTime: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e2e2e2ff",
    },
    detailsBlock: {
        flex: 1, // Take remaining space
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#edededff",
        marginBottom: 5,
    },
    eventUser: {
        fontSize: 14,
        fontWeight: "500",
        color: "#edededff",
        marginBottom: 5,
    },
    eventStatus: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",
    },
});

export default AbsenceComponentItem;
