import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ThreeDotsMenu = ({ onView, onEdit, onCancel }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Dots */}
      <Pressable onPress={() => setVisible(true)}>
        <FontAwesome name="ellipsis-v" size={20} color="white" />
      </Pressable>

      {/* Dropdown */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <Pressable
              style={styles.item}
              onPress={() => {
                setVisible(false);
                onView?.();
              }}
            >
              <Text style={styles.text}>View</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setVisible(false);
                onEdit?.();
              }}
            >
              <Text style={styles.text}>Edit</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setVisible(false);
                onCancel?.();
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 20,
  },
  menu: {
    backgroundColor: "#262626",
    borderRadius: 8,
    width: 140,
    elevation: 5,
  },
  item: {
    padding: 12,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});


export default ThreeDotsMenu;
