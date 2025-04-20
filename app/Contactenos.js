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
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const CentroAyudaScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [problema, setProblema] = useState('');

  const handleEnviarSolicitud = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingrese su correo electrónico');
      return;
    }

    if (!problema.trim()) {
      Alert.alert('Error', 'Por favor describa su problema');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
      return;
    }

    // Mostrar el mensaje de confirmación con el botón Continuar
    Alert.alert(
      'Solicitud enviada',
      'Su solicitud ha sido enviada. El centro de soporte se comunicará con usted por su correo electrónico.',
      [
        {
          text: 'Continuar',
          onPress: () => navigation.navigate('Inicio') // Cambia 'Inicio' por tu pantalla de destino
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
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

          <Text style={styles.title}>Centro de ayuda</Text>

          <Text style={styles.description}>
            Por favor, ingrese sus datos y describa el problema que está experimentando
          </Text>

          <View style={styles.box}>
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Describa su problema"
              placeholderTextColor="#999"
              style={[styles.input, styles.multilineInput]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={problema}
              onChangeText={setProblema}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleEnviarSolicitud}>
            <Text style={styles.buttonText}>Enviar solicitud</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    alignItems: 'center',
    paddingTop: 90,
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
    fontSize: 16,
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
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  box: {
    width: '100%',
    backgroundColor: '#2e2e2e',
    borderRadius: 15,
    padding: 25,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    color: '#000',
    width: '100%',
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CentroAyudaScreen;