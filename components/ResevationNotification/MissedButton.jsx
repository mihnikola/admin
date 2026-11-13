import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    Text,
    StyleSheet,
} from "react-native";

const MissedButton = ({ onPress, text }) => {
    return (
        <TouchableOpacity
            style={styles.missedButton}
            onPress={onPress}
        >
            <Text style={styles.textBold}>{text}</Text>
            <FontAwesome5
                name="calendar-times"
                size={60}
                color={ColorsBarber.dark.textColor}
                solid
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    missedButton: {
        alignItems: "center",
        flexGrow: 4
    },
    textBold: {
        color: ColorsBarber.dark.textColor,
        fontSize: 22,
        fontFamily: "OldStandard-Bold",
    },
});
export default MissedButton;