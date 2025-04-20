import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const images = [
  require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.15.27 AM.jpeg'),
  require('../assets/Avatars/WhatsApp Image 2025-03-03 at 2.19.44 PM.jpeg'),
  require('../assets/Avatars/WhatsApp Image 2025-03-03 at 2.20.28 PM.jpeg'),
  require('../assets/Avatars/pepito-banner-1.png'),
  require('../assets/Avatars/WhatsApp Image 2025-03-02 at 7.28.22 PM.jpeg'),
  require('../assets/Avatars/Pepito-5-1024x576.jpg'),
  require('../assets/Avatars/WhatsApp Image 2025-03-03 at 2.22.20 PM.jpeg'),
  require('../assets/Avatars/WhatsApp Image 2025-03-03 at 2.21.10 PM.jpeg'),
 
];

const ProfileScreen = (data) => {
  const profile = data.route.params.profile;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image 
          source={profile.avatar}
          style={styles.profilePic} 
        />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileDescription}>Futuro Ing en Producción.</Text>
        <Text style={styles.profileDescription}>Amante del Gym y salir a bailar.</Text>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.tabText}>Tus fotos</Text>
        </TouchableOpacity>
   
      </View>
      <ScrollView contentContainerStyle={styles.photosGrid}>
        {images.map((image, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image 
              source={image} 
              style={styles.photo} 
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 5,
  },
  settingsIcon: {
    fontSize: 20,
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDescription: {
    color: 'white',
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
  },
  inactiveTab: {
    paddingBottom: 5,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  photoContainer: {
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default ProfileScreen;