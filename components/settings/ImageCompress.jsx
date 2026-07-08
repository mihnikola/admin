// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import usePickImage from "./hooks/usePickImage";

// export default function ImageCompress({ imageValue, handlePickImage }) {
//   const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

//   useEffect(() => {
//     if (selectedImageUri) {
//       handlePickImage(selectedImageUri);
//     }

//   }, [selectedImageUri]);

//   return (
//     <View style={styles.container}>

//       {!selectedImageUri && (
//         <TouchableOpacity onPress={pickImage} disabled={uploading}>
//           <MaterialIcons name="image" size={120} color="white" />
//         </TouchableOpacity>
//       )}

//       {selectedImageUri && (
//         <View style={styles.imageWrapper}>
//           <View style={styles.defaultImgAvatar}>
//             <Image source={{ uri: selectedImageUri }} style={styles.image} />
//             <View style={styles.editButtonContainer}>
//               <TouchableOpacity
//                 style={styles.editButton}
//                 onPress={pickImage}
//                 disabled={uploading}
//                 hitSlop={50}
//               >
//                 <MaterialCommunityIcons name="pencil" size={25} color="#000" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   image: {
//     width: 125,
//     height: 125,
//     borderRadius: 100,
//     resizeMode: "cover",
//   },
//   editButtonContainer: {
//     position: "absolute",
//     alignSelf: "flex-end",
//     alignItems: "flex-start",
//   },
//   defaultImgAvatar: {
//     alignSelf: "baseline",
//     alignContent: "baseline",
//     justifyContent: "flex-end",
//     backgroundColor: "#fff",
//     borderRadius: 100,
//     padding: 2,
//   },
//   imageWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     alignContent: "center",
//   },
//   profileImage: {
//     width: 125,
//     height: 125,
//     borderRadius: 100,
//     resizeMode: "cover",
//   },

//   editButton: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 4,
//   },
// });

























import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import usePickImage from "./hooks/usePickImage";

export default function ImageCompress({ imageValue, handlePickImage }) {
  const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

  // Na samom početku, ekran je "zamrznut" (komponenta vraća null)
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);
  const [renderedUri, setRenderedUri] = useState(null);
  const [isPreloading, setIsPreloading] = useState(false);

  // 1. Prvo pokretanje: Proveravamo i učitavamo inicijalnu sliku (imageValue) ako postoji
  useEffect(() => {
    if (imageValue) {
      // Ako imamo sliku od ranije, držimo ekran praznim dok je ne učitamo u pozadini
      setIsPreloading(true);
    } else {
      // Ako nema slike uopšte, odmah dozvoli prikaz ikonice (nema šta da se čeka)
      setTimeout(() => {
        setIsInitialCheckDone(true);

      }, 50)
    }
  }, []);

  // 2. Osluškivanje izbora nove slike iz hook-a
  useEffect(() => {
    if (selectedImageUri) {
      handlePickImage(selectedImageUri);
      setIsPreloading(true);
    }
  }, [selectedImageUri]);

  // Ako se prva slika ili nova slika još uvek učitava u memoriji, ekran je prazan
  // Ovde se sprečava ono prvo treperenje i prikazivanje ikonice na milisekundu
  if (!isInitialCheckDone && imageValue && !renderedUri) {
    return (
      <View style={styles.container}>
        {/* Nevidljivo učitavanje inicijalne slike */}
        <Image
          source={{ uri: imageValue }}
          style={{ width: 1, height: 1, opacity: 0, position: 'absolute' }}
          onLoadEnd={() => {
            setRenderedUri(imageValue);
            setIsInitialCheckDone(true);
          }}
          onError={() => {
            // Ako slika pukne ili ne postoji na URL-u, pusti ikonicu
            setIsInitialCheckDone(true);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Skriveni preloader za sve NAKNADNE izmene slike (iz galerije/kamere) */}
      {isPreloading && selectedImageUri && (
        <Image
          source={{ uri: selectedImageUri }}
          style={{ width: 1, height: 1, position: "absolute", opacity: 0 }}
          onLoadEnd={() => {
            setRenderedUri(selectedImageUri);
            setIsPreloading(false);
          }}
        />
      )}

      {/* PRVI SLUČAJ: Prikazuje se TEK kada smo 100% sigurni da slika ne postoji */}
      {!renderedUri && isInitialCheckDone && (
        <TouchableOpacity onPress={pickImage} disabled={uploading || isPreloading}>
          <MaterialIcons name="image" size={120} color="white" />
        </TouchableOpacity>
      )}

      {/* DRUGI SLUČAJ: Prikazuje se tek kada je slika kompletno renderovana u memoriji */}
      {renderedUri && (
        <View style={styles.imageWrapper}>
          <View style={styles.defaultImgAvatar}>

            <Image
              source={{ uri: renderedUri }}
              style={styles.image}
            />

            <View style={styles.editButtonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={pickImage}
                // disabled={uploading || isPreloading}
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
    minHeight: 129, // Rezervisan prostor da layout ne "šeta" dok se čeka prvi render
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    resizeMode: "cover",
  },
  editButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  defaultImgAvatar: {
    position: "relative",
    alignSelf: "baseline",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 2,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});