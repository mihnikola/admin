// import { ScrollView, StyleSheet } from "react-native";
// import MenuItem from "./MenuItem";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const MenuItemContainer = ({ data }) => {
    const { title, icon } = data;
    return <TouchableOpacity
        style={styles.menuItem}
    >
        <Ionicons name={icon} size={24} color="white" />
        <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>

};


const styles = StyleSheet.create({


    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },

    menuItemText: {
        flex: 1, // Allows text to take up available space
        fontSize: 16,
        color: '#FFFFFF',
    },
});
export default MenuItemContainer;
