import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ColorsBarber } from "@/constants/Colors";

const SettingsImageComponent = ({ setIsImageLoading, image, editProfileBarber }) => {
    return (
        <TouchableOpacity
            style={styles.defaultImgAvatar}
            onPress={editProfileBarber}
            activeOpacity={0.8}
        >

            <Image
                source={{ uri: image }}
                style={styles.image}
                onLoadStart={() => setIsImageLoading(true)}
                onLoadEnd={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
            />
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

    defaultImgAvatar: {
        alignSelf: "center",
        alignContent: "baseline",
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: ColorsBarber.dark.textColor,
        borderRadius: 100,
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 100,
        resizeMode: "cover",
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

export default SettingsImageComponent;