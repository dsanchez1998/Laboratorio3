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

const OlvidoContrasenaScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleContinuar = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor introduzca su correo electrónico');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Por favor introduzca un correo electrónico válido');
    } else {
      // Aquí iría la lógica para enviar el código al correo
      Alert.alert('Éxito', 'Se ha enviado un código a su correo electrónico');
      navigation.navigate('CodigoVerificacion'); // Asumiendo que hay una pantalla siguiente
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image
          source={require('./assets/imagen/daniel.jpeg')} // Asegúrate de tener esta imagen en tu proyecto
          style={styles.profileImage}
        />
        <Text style={styles.name}>Daniel Sanchez</Text>

        <Text style={styles.title}>Olvido su contraseña</Text>

        <Text style={styles.description}>
          Se le enviara un código a su correo, para hacer el restablecimiento de su contraseña, por favor introduzca su correo electrónico.
        </Text>

        <View style={styles.box}>
          <TextInput
            placeholder="Introduce tu correo electrónico"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinuar}>
          <Text style={styles.buttonText}>Continuar</Text>
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

export default OlvidoContrasenaScreen;