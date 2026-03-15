import { useState, useCallback, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";
import { Alert, Platform } from "react-native";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_WIDTH = 1000;

export const createImageFormData = async (imageUri, fieldName) => {
  if (!imageUri) return null;

  // Kompresija i konverzija na jpg ako nije
  const manipResult = await ImageManipulator.manipulateAsync(
    imageUri,
    [], // možeš dodati resize, rotate itd.
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  const filename = manipResult.uri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename ?? "");
  const type = match ? `image/${match[1]}` : "image";

  const uri =
    Platform.OS === "android"
      ? manipResult.uri.replace("file://", "")
      : manipResult.uri;

  const formData = new FormData();
  formData.append(fieldName, {
    uri,
    name: filename,
    type,
  });

  return formData;
};

const usePickImage = (initialImageUri) => {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  useEffect(() => {
    setSelectedImageUri(initialImageUri);
  }, [initialImageUri]);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const compressImageUntilUnder1MB = async (uri) => {
    setUploading(true);

    let quality = 0.9;
    let finalUri = uri;
    const MAX_ATTEMPTS = 10;
    let attempts = 0;

    while (quality > 0.1 && attempts < MAX_ATTEMPTS) {
      // @ts-ignore: deprecated manipulateAsync
      const result = await ImageManipulator.manipulateAsync(
        finalUri,
        [{ resize: { width: MAX_WIDTH } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG },
      );

      const fileInfo = await FileSystem.getInfoAsync(result.uri);

      finalUri = result.uri;
      if (fileInfo.size <= MAX_FILE_SIZE) break;

      quality -= 0.1;
      attempts += 1;
    }

    return finalUri;
  };

  const pickImage = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant access to media library.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
        copyToCacheDirectory: true, // ✅ ovo automatski pravi file:// kopiju za standalone build
      });

      if (result.canceled) {
        setStatusMessage("Image selection cancelled.");
        return;
      }

      let imageUri = result.assets[0].uri;

      // compress + resize ako je potrebno
      const compressedUri = await compressImageUntilUnder1MB(imageUri);

      const compressedInfo = await FileSystem.getInfoAsync(compressedUri);
      if (compressedInfo.size > MAX_FILE_SIZE) {
        Alert.alert(
          "Warning",
          "Couldn't compress below 1MB. Best effort applied.",
        );
      }

      setSelectedImageUri(compressedUri);
      setStatusMessage("");
    } catch (error) {
      console.error("Error picking image:", error);
      setStatusMessage("Failed to pick image.");
    } finally {
      setUploading(false);
    }
  }, []);

  return { pickImage, selectedImageUri, uploading, statusMessage };
};

export default usePickImage;
