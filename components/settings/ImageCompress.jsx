import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import usePickImage from "./hooks/usePickImage";

export default function ImageCompress({ imageValue, handlePickImage }) {
  const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

  useEffect(() => {
    if (selectedImageUri) {
      handlePickImage(selectedImageUri);
    }
  }, [selectedImageUri]);

  return (
    <View style={styles.container}>
      {uploading && <ActivityIndicator size={32} />}

      {!selectedImageUri && (
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
          <MaterialIcons name="image" size={120} color="white" />
        </TouchableOpacity>
      )}

      {selectedImageUri && (
        <View style={styles.imageWrapper}>
          {/* <Image source={{ uri: selectedImageUri }} style={styles.image} /> */}
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.profileImage}
            onError={() => console.log("Ne može da učita sliku")}
            // defaultSource={require("./placeholder.png")}
          />
          <TouchableOpacity
            onPress={pickImage}
            disabled={uploading}
            style={styles.editButton}
            hitSlop={50}
          >
            <MaterialIcons name="edit" size={36} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  imageWrapper: {
    alignSelf: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },

  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1e1e1e",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
