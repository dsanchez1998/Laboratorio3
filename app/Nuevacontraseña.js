import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const NuevaContrasenaScreen = ({ navigation }) => {
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  const handleGuardarContrasena = () => {
    if (!nuevaContrasena || !repetirContrasena) {
      Alert.alert('Error', 'Por favor complete ambos campos');
      return;
    }

    if (nuevaContrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (nuevaContrasena !== repetirContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Si todo está correcto
    Alert.alert(
      'Éxito',
      'Contraseña actualizada correctamente',
      [
        {
          text: 'Continuar',
          onPress: () => {
            // Aquí puedes navegar a la pantalla que corresponda (ej. Login)
            navigation.navigate('Login'); 
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/imagen/daniel.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Daniel Sanchez</Text>

        <Text style={styles.title}>Nueva Contraseña</Text>

        <Text style={styles.description}>
          Por favor ingrese y confirme su nueva contraseña
        </Text>

        <View style={styles.box}>
          <TextInput
            placeholder="Nueva contraseña"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={nuevaContrasena}
            onChangeText={setNuevaContrasena}
          />

          <TextInput
            placeholder="Repetir contraseña"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={repetirContrasena}
            onChangeText={setRepetirContrasena}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardarContrasena}>
          <Text style={styles.buttonText}>Guardar contraseña</Text>
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
  container: {
    alignItems: 'center',
    paddingTop: 120,
    paddingBottom: 80,
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  box: {
    width: '100%',
    backgroundColor: '#2e2e2e',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NuevaContrasenaScreen;