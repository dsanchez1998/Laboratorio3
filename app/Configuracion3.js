import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const ConfiguracionScreen = () => {
  const [selectedImage, setSelectedImage] = useState(require('../assets/imagen/daniel.jpeg'));
  const [email, setEmail] = useState("danielsanchez192@gmail.com");
  const [nombre, setNombre] = useState("Daniel Sanchez");
  const [telefono, setTelefono] = useState("04125529532");
  const [presentacion, setPresentacion] = useState("Futuro ing en informática\nAmante del anime, y los videojuegos");

  const navigation = useNavigation();
 const atras= ()=>{
navigation.goBack();
 };
  const handleCambiarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería para cambiar la foto de perfil.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  const handleGuardarCambios = () => {
    console.log("Datos actualizados:");
    console.log("Email:", email);
    console.log("Nombre:", nombre);
    console.log("Teléfono:", telefono);
    console.log("Presentación:", presentacion);
    Alert.alert("Cambios guardados", "Tu información fue actualizada.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={atras}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image
          source={selectedImage}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{nombre}</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCambiarFoto}>
          <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <View style={styles.row}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                value="********"
                secureTextEntry
                editable={false}
              />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>
          </View>

          <Text style={styles.label}>Presentación</Text>
          <TextInput
            style={[styles.input, styles.presentation]}
            multiline
            numberOfLines={3}
            value={presentacion}
            onChangeText={setPresentacion}
          />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Cambiarcontraseña")}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleGuardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  backText: {
    color: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#2c2c2c',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumn: {
    width: '48%',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  presentation: {
    height: 90,
    textAlignVertical: 'top',
  },
  actionButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConfiguracionScreen;
