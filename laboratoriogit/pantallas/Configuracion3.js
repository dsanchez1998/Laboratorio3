import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const ConfiguracionScreen = () => {
  const handleCambiarFoto = () => {
    console.log("Cambiar foto de perfil");
  };

  const handleGuardarCambios = () => {
    console.log("Guardar cambios");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>Atras</Text>
        </TouchableOpacity>

        <Image
          source={require('./assets/imagen/daniel.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Daniel Sanchez</Text>

        {/* Botón para cambiar foto */}
        <TouchableOpacity style={styles.secondaryButton} onPress={handleCambiarFoto}>
          <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <TextInput
            style={styles.input}
            value="danielsanchez192@gmail.com"
            editable={false}
          />
          <TextInput
            style={styles.input}
            value="Daniel Sanchez"
            editable={false}
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
              <Text style={styles.label}>Telefono</Text>
              <TextInput
                style={styles.input}
                value="04125529532"
                editable={false}
              />
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

        {/* Nuevo botón de guardar cambios */}
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
    backgroundColor: '#32CD32', // color verde para diferenciar "Guardar"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConfiguracionScreen;
