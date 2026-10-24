import { Image, StyleSheet } from "react-native";


const SettingsBackgroundImageComponent = () => {
    return (
        <Image
            source={require("@/assets/images/coverImage.jpg")}
            style={styles.coverImage}
        />
    )
}
const styles = StyleSheet.create({
    coverImage: {
        width: "100%",
        height: "100%",
        opacity: 0.3,
        position: "absolute",
    },
});

export default SettingsBackgroundImageComponent;