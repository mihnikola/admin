import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const usePickImage = (imageValue = null) => {
  const [selectedImageUri, setSelectedImageUri] = useState(imageValue);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    setSelectedImageUri(imageValue);
  }, [imageValue])



  const pickImage = useCallback(async () => {
    setUploading(true);

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please grant access to media library.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // works across all Expo versions
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        setStatusMessage('Image selection cancelled.');
        return;
      }

      const originalUri = result.assets[0].uri;

      // Resize once
      const resized = await ImageManipulator.manipulateAsync(
        originalUri,
        [{ resize: { width: 1000 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      let quality = 0.9;
      let finalUri = resized.uri;

      // Compress until under 1MB (best effort)
      while (quality > 0.1) {
        const compressed = await ImageManipulator.manipulateAsync(
          resized.uri,
          [],
          { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
        );

        const info = await FileSystem.getInfoAsync(compressed.uri);

        if (info.size && info.size <= MAX_FILE_SIZE) {
          finalUri = compressed.uri;
          break;
        }

        finalUri = compressed.uri;
        quality -= 0.1;
      }

      const finalInfo = await FileSystem.getInfoAsync(finalUri);

      if (finalInfo.size && finalInfo.size > MAX_FILE_SIZE) {
        Alert.alert(
          'Warning',
          "Couldn't compress below 1MB. Best effort applied."
        );
      }

      setSelectedImageUri(finalUri);
      setStatusMessage('');
    } catch (error) {
      console.error('Error picking image:', error);
      setStatusMessage('Failed to pick image.');
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    pickImage,
    selectedImageUri,
    uploading,
    statusMessage,
  };
};

export default usePickImage;
