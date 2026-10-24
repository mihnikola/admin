import { StyleSheet, View } from "react-native";
import SettingsItem from "./SettingsItem";
import { ScrollView } from "react-native";

const SettingsList = ({ settingsOptions, handlePress }) => {
    return (
        <View style={styles.listWrapper}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {settingsOptions.map((item) => (
                    <SettingsItem
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        onPress={() => handlePress(item.route)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    listWrapper: {
        flex: 1,
    },
    scrollContent: {
        marginHorizontal: 6,
        marginVertical: 8,
    },
});

export default SettingsList;