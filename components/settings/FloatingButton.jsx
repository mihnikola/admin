import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FloatingButton({ onPress }) {
    const insets = useSafeAreaInsets();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.fab,
                {
                    bottom: 20 + insets.bottom, 
                },
            ]}
        >
            <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#5e5e5e",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#bdbdbd",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        zIndex: 100,
    },
});



