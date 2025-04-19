import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const CreatePostScreen = ({ navigation }) => {
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!comment && !selectedImage) {
      Alert.alert('Error', 'Agrega texto o una imagen para publicar');
      return;
    }
    Alert.alert('Listo', 'Tu publicación ha sido compartida');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar Superior */}
      <View style={styles.navbarContainer}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>More</Text>
          <TouchableOpacity>
            <Icon name="comment" size={24} color="white" style={styles.chatIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity>
            <Icon name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSelectImage}>
            <Icon name="plus-square" size={24} color="#1E90FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image 
              source={require('./assets/imagen/3af3aba6a0ecec50f9dbd62f5684da4f.jpg')} 
              style={styles.profilePicSmall} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Área de Creación */}
      <ScrollView style={styles.content}>
        <TextInput
          placeholder="¿Qué quieres compartir hoy?"
          placeholderTextColor="#888"
          style={styles.input}
          multiline
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity 
          style={styles.imageSelector}
          onPress={handleSelectImage}
        >
          <Icon name="image" size={28} color="#1E90FF" />
          <Text style={styles.imageSelectorText}>Agregar imagen</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.selectedImage} 
            />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="times-circle" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.submitButton, (!comment && !selectedImage) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!comment && !selectedImage}
        >
          <Text style={styles.submitText}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ESTILOS (antes faltaba esta sección)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    marginTop: 30
  },
  navbarContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  chatIcon: {
    marginRight: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  profilePicSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#252525',
    color: 'white',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  imageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  imageSelectorText: {
    color: '#1E90FF',
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: 300,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#1E90FF50',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatePostScreen;