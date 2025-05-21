import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfiguracionScreen = () => {
  const navigation = useNavigation();
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

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{nombreCompleto}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <TextInput style={styles.input} value="" editable={false} />
          <TextInput style={styles.input} value="" editable={false} />

          <View style={styles.row}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                value=""
                secureTextEntry
                editable={false}
              />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Telefono</Text>
              <TextInput style={styles.input} value="" editable={false} />
            </View>
          </View>

          <Text style={styles.label}>Presentación</Text>
          <TextInput
            style={[styles.input, styles.presentation]}
            multiline
            numberOfLines={3}
            value={descripcion}
            editable={false}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Configuracion3")}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Modificar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cambiarcontraseña")}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
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
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#2c2c2c",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputColumn: {
    width: "48%",
  },
  label: {
    color: "#fff",
    marginBottom: 5,
  },
  presentation: {
    height: 90,
    textAlignVertical: "top",
  },
  actionButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ConfiguracionScreen;
