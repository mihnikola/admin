import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { ColorsBarber } from "@/constants/Colors";

const SettingsAvatarComponent = ({ editProfileBarber, initials }) => {
    return (
        <TouchableOpacity
            style={styles.initialContainer}
            onPress={editProfileBarber}
            activeOpacity={0.8}
        >
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarTextInitials}>{initials}</Text>
            </View>
            <View style={styles.editButtonContainer}>
                <View style={styles.editButton}>
                    <MaterialCommunityIcons
                        name="pencil"
                        size={25}
                        color={ColorsBarber.dark.textColorInput}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    initialContainer: {
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "flex-end",
        backgroundColor: ColorsBarber.dark.item,
        borderRadius: 50,
    },
    avatarContainer: {
        padding: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: ColorsBarber.dark.textColor,
    },
    avatarTextInitials: {
        fontSize: 32,
        letterSpacing: 2,
        fontFamily: "OldStandard-Regular",
        color: ColorsBarber.dark.textColor,
    },

    editButtonContainer: {
        position: "absolute",
        alignSelf: "flex-end",
        alignContent: "flex-end",
    },
    editButton: {
        backgroundColor: ColorsBarber.dark.textColor,
        borderRadius: 20,
        padding: 4,
    },
});

export default SettingsAvatarComponent;