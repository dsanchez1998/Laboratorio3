import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        {/* Logo en lugar del search box */}
        <Image 
          source={require('./assets/WhatsApp Image 2025-03-03 at 4.58.32 PM.jpeg')} // Reemplaza con la ruta de tu logo
          style={styles.logo} 
          resizeMode="contain"
        />
        <Icon name="comment" size={24} color="white" style={styles.chatIcon} />
      </View>
      <View style={styles.navbar}>
        <Icon name="home" size={24} color="white" style={styles.icon} />
        <Icon name="search" size={24} color="white" style={styles.iconActive} />
        <Icon name="plus-square" size={24} color="white" style={styles.icon} />
        <Icon name="heart" size={24} color="white" style={styles.icon} />
        <Image 
          source={require('./assets/WhatsApp Image 2025-03-03 at 4.58.32 PM.jpeg')} 
          style={styles.profilePicSmall} 
        />
      </View>
    </View>
  );
};

const OnePlaceLakersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      
      <ScrollView style={styles.content}>
        {/* Sección One Place Lakers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>One Place Lakers</Text>
          <Text style={styles.sectionText}>
            Lenizmente estamos llegando, a nuestro momento tan esperado!!!
          </Text>
        </View>

        {/* Separador visual */}
        <View style={styles.separator} />

        {/* Sección ONE PIEDE LAKERS */}
        <View style={[styles.sectionContainer, styles.highlightedSection]}>
          <Text style={styles.brandTitle}>ONE PIEDE</Text>
          <Text style={styles.teamTitle}>LAKERS</Text>
          <Text style={styles.location}>LOS ANGELES</Text>
          
          {/* Sección de likes */}
          <View style={styles.likesContainer}>
            <Text style={styles.likesText}>Me gusta</Text>
            <View style={styles.likeIcons}>
              <Icon name="thumbs-up" size={16} color="white" style={styles.likeIcon} />
              <Icon name="thumbs-up" size={16} color="white" style={styles.likeIcon} />
              <Icon name="thumbs-up" size={16} color="white" style={styles.likeIcon} />
            </View>
          </View>
        </View>

        {/* Separador visual */}
        <View style={styles.separator} />

        {/* Sección de comentarios - Llama 1 */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Llama</Text>
          <Text style={styles.commentSubtitle}>Que piene es el mejor asino</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>Véase Gordia</Text>
          </View>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>Que piene es la antigua</Text>
          </View>
        </View>

        {/* Sección de comentarios - Llama 2 */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Llama</Text>
          <Text style={styles.commentSubtitle}>Lucy vuelve aquí</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>Véase Mares</Text>
          </View>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>Lucyvéase Hervor</Text>
          </View>
        </View>

        {/* Sección de comentarios - Llama 3 */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Llama</Text>
          <Text style={styles.commentSubtitle}>El espacio humano menor, le extrañaba</Text>
          <View style={[styles.commentBox, styles.highlightedComment]}>
            <Text style={styles.commentText}>¡Estaba un comentario!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navbarContainer: {
    width: '100%',
    backgroundColor: '#111',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
  chatIcon: {
    padding: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  icon: {
    color: 'white',
  },
  iconActive: {
    color: '#3498db',
  },
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  highlightedSection: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
  },
  brandTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  teamTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  location: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  likesText: {
    color: 'white',
    marginRight: 10,
    fontSize: 16,
  },
  likeIcons: {
    flexDirection: 'row',
  },
  likeIcon: {
    marginHorizontal: 3,
  },
  commentContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  commentTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentSubtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  commentBox: {
    backgroundColor: '#252525',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  highlightedComment: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  commentText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default OnePlaceLakersScreen;
