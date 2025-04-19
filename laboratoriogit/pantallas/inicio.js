import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const Post = ({ name, text, profileImage, postImage }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profilePic} />
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.postText}>{text}</Text>
        </View>
      </View>
      <Image source={postImage} style={styles.postImage} />
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setLiked(!liked)}
        >
          <Icon 
            name="heart" 
            size={20} 
            color={liked ? 'red' : 'white'} 
          />
          <Text style={styles.actionText}>Me gusta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment" size={20} color="white" />
          <Text style={styles.actionText}>Comentar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setSaved(!saved)}
        >
          <Icon 
            name="bookmark" 
            size={20} 
            color={saved ? '#888' : 'white'} 
          />
          <Text style={styles.actionText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>More</Text>
        <TouchableOpacity>
          <Icon name="comment" size={24} color="white" style={styles.chatIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Icon name="home" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="plus-square" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/imagen/3af3aba6a0ecec50f9dbd62f5684da4f.jpg')} style={styles.profilePicSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const App = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView>
        <Post 
          name="Daniel Sanchez" 
          text="Mi anime favorito ❤️"
          profileImage={require('./assets/imagen/WhatsApp Image 2025-03-02 at 7.39.09 PM.jpeg')}
          postImage={require('./assets/imagen/WhatsApp Image 2025-03-02 at 7.39.09 PM.jpeg')}
        />
        <Post 
          name="Roussell Duran" 
          text="Mi momento favorito del día"
          profileImage={require('./assets/imagen/rousse.jpeg')}
          postImage={require('./assets/imagen/rousse.jpeg')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  navbarContainer: {
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  chatIcon: {
    marginRight: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    width: '100%',
  },
  icon: {
    marginHorizontal: 10,
  },
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  postContainer: {
    backgroundColor: '#222',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
  },
  postText: {
    color: 'white',
  },
  postImage: {
    height: 200,
    borderRadius: 10,
    width: '100%',
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default App;