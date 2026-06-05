import { useLocalization } from "@/contexts/LocalizationContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SharedLoader } from "@/shared-components/SharedLoader";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import useAbsentHours from "./hooks/useAbsentHours";
import AbsenceComponentItem from './AbsenceComponentItem';


const AbsentManagementList = () => {
    const { isLoading, getAbsenceEmployer, absenceData } = useAbsentHours();

    const { localization } = useLocalization();

    useEffect(() => {
        getAbsenceEmployer();
    }, []);

    if (isLoading === "fetchAbsence") {
        return <SharedLoader isOpen={isLoading === "fetchAbsence"} />;
    }
    if (absenceData.length === 0) {

        return (
            <View style={styles.card}>
                <View>
                    <SharedBackButton
                        onPress={router.back}
                        styleBtn={{ marginTop: 20 }}
                    />
                </View>
                <View style={{ marginTop: 100, padding: 50 }}>
                    <Text style={styles.capture}>{localization.SETTINGS.ABSENTHOURS.errorList}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <SharedBackButton onPress={router.back} styleBtn={{ marginTop: 20 }} />
            <View style={styles.header}>
                <Text style={styles.subTitle}>
                    {localization.HOME.listRequirements}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                {isLoading !== "fetchAbsence" && (
                    <FlatList
                        data={absenceData}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <AbsenceComponentItem item={item} />}
                    />
                )}
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#000",
        margin: 15
    },
    header: {
        marginVertical: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#000",
        flex: 1,
        flexDirection: "column",
    },
    capture: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "900",
        color: "#fff",
    },
});

export default AbsentManagementList;
