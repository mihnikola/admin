import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";

const BarberServicesListInput = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name="playlist-plus"
                    size={25}
                    color={ColorsBarber.dark.textColorInput}
                />
                <View style={styles.viewContainer}>

                    <TouchableOpacity style={styles.lockRow} onPress={props.onPress}>
                        <Text style={styles.lock}>{props.label}</Text>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color={ColorsBarber.dark.textColorInput}
                        />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    lockRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    lock: {
        color: ColorsBarber.dark.textColorInput,
        fontSize: 15,
        fontFamily: "OldStandard-Regular",
    },

    viewContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    container: {
        flexDirection: "row",
        backgroundColor: ColorsBarber.dark.inputField,
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 12
    },

    iconContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 5
    },
});

export default BarberServicesListInput;
