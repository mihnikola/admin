import { StyleSheet, Text, View } from "react-native";
import { ColorsBarber } from "@/constants/Colors";

const SettingsAvatarTextComponent = ({ name }) => {
    return (
        <View style={styles.avatarContainerText}>
            <Text style={styles.avatarText}>{name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({

    avatarContainerText: {
        marginTop: 20
    },
    avatarText: {
        color: ColorsBarber.dark.textColor,
        fontFamily: "OldStandard-Bold",
        fontSize: 23,
        letterSpacing: 2,
    },
});

export default SettingsAvatarTextComponent;