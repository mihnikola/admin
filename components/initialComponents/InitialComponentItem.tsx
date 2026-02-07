import React from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { height } = Dimensions.get('window');

export default function InitialComponentItem({item}) {
  return (
    <View style={styles.container}>
      {/* Status Bar */}

      {/* Image Background */}
      <ImageBackground
        source={item.image} // Replace with your image path
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* You can optionally add an overlay here if the image needs to be darker */}
        <View style={styles.imageOverlay} />
      </ImageBackground>

      {/* Content Overlay */}
      <View style={styles.contentContainer}>
        {/* Pagination Dots (Optional) */}
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Main Title */}
        <Text style={styles.title}>Effortless Bookings,{'\n'}Always on Time!</Text>

        {/* Description Text */}
        <Text style={styles.description}>
          It is a long established fact that a reader will be distracted by the readable content.
        </Text>

        {/* Next Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Or your desired background color
  },
  imageBackground: {
    width: 500,
    height: height * 0.6, // Adjust height as needed, e.g., 60% of screen height
    justifyContent: 'flex-end', // Align content to the bottom of the image if any
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // Adjust opacity as needed
  },
  contentContainer: {
    flex: 1, // Takes the remaining space
    backgroundColor: '#1E1E1E', // Dark background color from your image
    borderTopLeftRadius: 30, // Example for rounded corners if desired
    borderTopRightRadius: 30, // Example for rounded corners if desired
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between', // Distribute content vertically
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555', // Inactive dot color
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF', // Active dot color (blue from your image)
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left', // Align text to the left
    marginBottom: 10,
    lineHeight: 40, // Adjust line height for multiline text
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'left',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF', // Blue color from your image
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});