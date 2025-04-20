import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
 const navigation = useNavigation();

 return(
  <View style={styles.navbarContainer}>
    <View style={styles.topBar}>
    <Text style={styles.logo}>More</Text>
     <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
     < Icon name="comment" size={24} color="white" />
     </TouchableOpacity>
     
    </View>
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Inicio")}  ><Icon name="home" size={24} color="white" style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Buscar")} ><Icon name="search" size={24} color="white" style={styles.iconActive} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Agregar")} ><Icon name="plus-square" size={24} color="white" style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")} ><Icon name="heart" size={24} color="white" style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <Image
          source={require('../assets/imagen/WhatsApp Image 2025-03-03 at 4.58.32 PM.jpeg')}
          style={styles.profilePicSmall}
        />
      </TouchableOpacity>
    </View>
  </View>
 );
};

const Post = ({ isKeyboardVisible, uri }) => {

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity>
          <Image
            source={require('../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg')}
            style={styles.profilePicLarge}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text style={styles.postUser}>One Piece Lakers</Text>
            <Text style={styles.postTime}>Lentamente estamos llegando, a nuestro momento tan esperado!!!</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={uri}
        style={[styles.postImage, isKeyboardVisible && styles.postImageSmall]}
      />

      <View style={styles.postActions}>
        <TouchableOpacity onPress={toggleLike}>
          <Icon name="heart" size={24} color={liked ? 'red' : 'white'} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSave}>
          <Icon name="bookmark" size={24} color={saved ? 'gold' : 'white'} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Comments = () => (
  <View style={styles.commentsContainer}>
    <ScrollView style={{ maxHeight: 130 }}>
      <Text style={styles.comment}><Text style={styles.commentUser}>Hanna:</Text> One piece es el mejor anime</Text>
      <Text style={styles.comment}><Text style={styles.commentUser}>Víctor García:</Text> El One Piece es real!!!</Text>
      <Text style={styles.comment}><Text style={styles.commentUser}>Nami:</Text> Luffy vuelve aquí</Text>
      <Text style={styles.comment}><Text style={styles.commentUser}>Violet Myers:</Text> Mugiwara forever</Text>
      <Text style={styles.comment}><Text style={styles.commentUser}>Sabo:</Text> Mi querido hermano menor, te extrañaba</Text>
    </ScrollView>
    <TextInput
      style={styles.commentInput}
      placeholder="Escribe un comentario..."
      placeholderTextColor="#aaa"
    />
  </View>
);

const App = (data) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const imgUri = data.route.params.uri;
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Navbar />
      <ScrollView>
        <Post isKeyboardVisible={keyboardVisible} uri={imgUri} />
        <Comments />
      </ScrollView>
    </KeyboardAvoidingView>
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
  iconActive: {
    color: '#3498db',
  },
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  postContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postUser: {
    color: 'white',
    fontWeight: 'bold',
  },
  postTime: {
    color: 'gray',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  postImageSmall: {
    height: 200, // cuando aparece el teclado
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  commentsContainer: {
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    margin: 10,
  },
  comment: {
    color: 'white',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentInput: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    color: 'white',
    marginTop: 10,
  },
});

export default App;
