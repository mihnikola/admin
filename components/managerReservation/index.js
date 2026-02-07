import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import useManagerReservation from "./hooks/useManagerReservation";
import { SharedLoader } from "@/shared-components/SharedLoader";

export default function ManagerReservation() {
    const { localization } = useLocalization();
    const { isLoading, submitHandler, refreshHandler, isMessage, getLimitation, lastResponse, setIsMessage, dailyLimit, setDailyLimit, weeklyLimit, setWeeklyLimit, monthlyLimit, setMonthlyLimit } = useManagerReservation();
    if (isLoading === 'get') {
        return <SharedLoader isOpen={isLoading === 'get'} />
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text style={styles.title}>{localization.SETTINGS.LIMIT.capture}</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>{localization.SETTINGS.LIMIT.subTitle}</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder={localization.SETTINGS.LIMIT.day}
                    keyboardType="number-pad"
                    value={dailyLimit}
                    onChangeText={setDailyLimit}
                />
                <TextInput
                    style={styles.input}
                    placeholder={localization.SETTINGS.LIMIT.week}
                    keyboardType="number-pad"
                    value={weeklyLimit}
                    onChangeText={setWeeklyLimit}
                />
                <TextInput
                    style={styles.input}
                    placeholder={localization.SETTINGS.LIMIT.month}
                    keyboardType="number-pad"
                    value={monthlyLimit}
                    onChangeText={setMonthlyLimit}
                />

                <View>
                    <SharedButton
                        loading={isLoading === 'put'}
                        onPress={submitHandler}
                        text={localization.SETTINGS.LIMIT.submit}
                    />
                </View>
                <View style={styles.limitsDisplay}>
                    <Text style={styles.limitsTitle}>{localization.SETTINGS.LIMIT.info}</Text>
                    <Text style={styles.limitsTitleDay}>
                        🗓️ {localization.SETTINGS.LIMIT.daily}{" "}
                        {getLimitation?.counterDaily}
                    </Text>
                    <Text style={styles.limitsTitleDay}>
                        📅 {localization.SETTINGS.LIMIT.weekly}{" "}
                        {getLimitation?.counterWeekly}
                    </Text>

                    <Text style={styles.limitsTitleDay}>
                        📆 {localization.SETTINGS.LIMIT.monthly}{" "}
                        {getLimitation?.counterMonthly}
                    </Text>
                </View>
            </ScrollView>
            {isMessage && (
                <SharedMessage
                    isOpen={isMessage}
                    buttonText="OK"
                    icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
                    title={lastResponse}
                    onClose={() => setIsMessage(false)}
                    onConfirm={refreshHandler}
                />
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    limitsTitleDay: {
        color: "white",
        fontSize: 16,
    },
    limitsDisplay: {
        gap: 15,
        backgroundColor: "#010101",
        borderRadius: 8,
    },
    limitsTitle: {
        fontWeight: "bold",
        marginBottom: 8,
        color: "white",
        fontSize: 19,
    },
    container: {
        paddingHorizontal: 24,
        backgroundColor: "#000",
        justifyContent: "center",
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff",
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
        color: "#fff",
        lineHeight: 23
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        color: "white",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
});
