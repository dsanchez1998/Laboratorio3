import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = ({ navigation }) => {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState(null);

  useEffect(() => {
    const cargarFotoPerfil = async () => {
      const foto = await AsyncStorage.getItem("foto_perfil");
      const nombreCompleto = await AsyncStorage.getItem("nombreCompleto");
      setNombreCompleto(nombreCompleto);
      setFotoPerfil(foto);
    };
    cargarFotoPerfil();
  }, []);

  const imageUrl = fotoPerfil ? `${URL_API}/avatars/${fotoPerfil}` : null;

  const handlePerfil = () => {
    navigation.navigate("Configuracion2"); // Navega a la pantalla de Perfil
  };

  const handleContactenos = () => {
    navigation.navigate("Contactenos"); // Navega a la pantalla de Contacto/Centro de ayuda
  };

  const handleCerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar tu sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("foto_perfil");
          await AsyncStorage.removeItem("nombreCompleto");
          await AsyncStorage.removeItem("descripcion");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          //navigation.navigate("Login"), // Navega a la pantalla de Login
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Regresa a la pantalla anterior
      >
        <Text style={styles.backText}>Atras</Text>
      </TouchableOpacity>

      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.name}>{nombreCompleto}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePerfil}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContactenos}>
        <Text style={styles.buttonText}>Contáctenos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleCerrarSesion}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    paddingTop: 150,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 20,
  },
  backText: {
    color: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 15,
    width: "70%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF3B30", // Rojo para el botón de cerrar sesión
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfileScreen;
