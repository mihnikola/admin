import { useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import usePickImage from './hooks/usePickImage';

export default function ImageCompress({ imageValue, handlePickImage }) {
    const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

    useEffect(() => {
        handlePickImage(selectedImageUri);
    }, [selectedImageUri]);

    useEffect(() => {
        handlePickImage(imageValue);
    }, [imageValue]);

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
                    <Image source={{ uri: selectedImageUri }} style={styles.image} />

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    imageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },

    editButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 30,
        padding: 6,
    },
});
