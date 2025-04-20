import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ConfiguracionScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCambiarFoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permitir acceso a tu galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGuardarCambios = () => {
    console.log('Guardar cambios');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image
          source={selectedImage ? { uri: selectedImage } : require('../assets/imagen/daniel.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Daniel Sanchez</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCambiarFoto}>
          <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <TextInput style={styles.input} value="danielsanchez192@gmail.com" editable={false} />
          <TextInput style={styles.input} value="Daniel Sanchez" editable={false} />

          <View style={styles.row}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput style={styles.input} value="********" secureTextEntry editable={false} />
            </View>

            <View style={styles.inputColumn}>
              <Text style={styles.label}>Telefono</Text>
              <TextInput style={styles.input} value="04125529532" editable={false} />
            </View>
          </View>

          <Text style={styles.label}>Presentación</Text>
          <TextInput
            style={[styles.input, styles.presentation]}
            multiline
            numberOfLines={3}
            value={'Futuro ing en informática\nAmante del anime, y los videojuegos'}
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Modificar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleGuardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    top: 20,
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
