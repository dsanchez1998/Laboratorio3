import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("saved");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState(null);
  const [descripcion, setDescripcion] = useState(null);

  useEffect(() => {
    const cargarFotoPerfil = async () => {
      const foto = await AsyncStorage.getItem("foto_perfil");
      const nombreCompleto = await AsyncStorage.getItem("nombreCompleto");
      const descripcion = await AsyncStorage.getItem("descripcion");
      setNombreCompleto(nombreCompleto);
      setFotoPerfil(foto);
      setDescripcion(descripcion);
    };
    cargarFotoPerfil();
  }, []);

  const imageUrl = fotoPerfil ? `${URL_API}/avatars/${fotoPerfil}` : null;

  const images = [
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.12 PM.jpeg"),
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.32.18 PM.jpeg"),
    require("../assets/imagen/GEThHg_bwAAdeR1.jpg"),
    require("../assets/imagen/WhatsApp Image 2025-03-02 at 7.38.32 PM.jpeg"),
    require("../assets/imagen/daniel.jpeg"),
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg"),
  ];
  const handleContinuar = () => {
    navigation.navigate("Perfil");
  };
  const handleBack = () => {
    navigation.navigate("Inicio");
  };

  const handleSettings = () => {
    navigation.navigate("Configuracion");
  };

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImage = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de perfil */}
      <View style={styles.profileSection}>
        <Image source={{ uri: imageUrl }} style={styles.profilePic} />
        <Text style={styles.profileName}>{nombreCompleto}</Text>
        <Text style={styles.profileDescription}>{descripcion}</Text>
      </View>

      {/* Pestañas */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "photos" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={handleContinuar}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "photos"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Tus fotos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "saved" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("saved")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "saved"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Guardado
          </Text>
        </TouchableOpacity>
      </View>

      {/* Galería de imágenes */}
      <ScrollView contentContainerStyle={styles.photosGrid}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.photoContainer}
            onPress={() => openImage(image)}
          >
            <Image source={image} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para imagen ampliada */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeImage}
      >
        <Pressable style={styles.modalContainer} onPress={closeImage}>
          <Image source={selectedImage} style={styles.modalImage} />
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343541",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  backButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  backText: {
    color: "white",
    fontWeight: "bold",
  },
  settingsButton: {
    padding: 5,
  },
  settingsIcon: {
    fontSize: 20,
    color: "white",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileDescription: {
    color: "white",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "black",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  inactiveTab: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "black",
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  photoContainer: {
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default ProfileScreen;
