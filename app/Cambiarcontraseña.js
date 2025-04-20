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

const CambiarContrasenaScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleGuardarCambios = () => {
    if (!password || !repeatPassword) {
      Alert.alert('Error', 'Por favor complete ambos campos');
    } else if (password !== repeatPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
    } else {
      // Aquí podrías enviar la nueva contraseña al backend
      Alert.alert('Éxito', 'Contraseña actualizada');
      setPassword('');
      setRepeatPassword('');
      navigation.goBack();
    }
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

        <Text style={styles.title}>Cambiar contraseña</Text>

        <View style={styles.box}>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Repetir contraseña"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Olvidarcontraseña")}>
            <Text style={styles.link}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
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
  container: {
    alignItems: 'center',
    paddingTop: 120,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 30,
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
    marginBottom: 30,
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
    marginBottom: 35,
    color: '#000',
  },
  link: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
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

export default CambiarContrasenaScreen;
