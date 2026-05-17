import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import usePickImage from "./hooks/usePickImage";

export default function ImageCompress({ imageValue, handlePickImage }) {
  const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

  const [isLoading, setIsLoading] = useState(true);
  console.log("imageValue", imageValue);
  useEffect(() => {
    if (selectedImageUri) {
      handlePickImage(selectedImageUri);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [selectedImageUri]);

  return (
    <View style={styles.container}>
      {uploading || (isLoading && <ActivityIndicator size={50} />)}

      {!selectedImageUri && !isLoading && (
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
          <MaterialIcons name="image" size={120} color="white" />
        </TouchableOpacity>
      )}

      {selectedImageUri && !isLoading && (
        <View style={styles.imageWrapper}>
          {/* <Image source={{ uri: selectedImageUri }} style={styles.image} /> */}
          {/* <Image
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
                <MaterialCommunityIcons name="pencil" size={25} color="#000" />
          </TouchableOpacity> */}
          <View style={styles.defaultImgAvatar}>
            <Image source={{ uri: selectedImageUri }} style={styles.image} />
            <View style={styles.editButtonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={pickImage}
                disabled={uploading}
                hitSlop={50}
              >
                <MaterialCommunityIcons name="pencil" size={25} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
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
    alignItems: "flex-start",
  },
  defaultImgAvatar: {
    alignSelf: "baseline",
    alignContent: "baseline",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 2,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    resizeMode: "cover",
  },

  editButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },
});
