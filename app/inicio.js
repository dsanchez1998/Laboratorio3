import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          <Icon name="heart" size={20} color={liked ? "red" : "white"} />
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
          <Icon name="bookmark" size={20} color={saved ? "#888" : "white"} />
          <Text style={styles.actionText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Navbar = () => {
  const navigation = useNavigation();
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    const cargarFotoPerfil = async () => {
      const foto = await AsyncStorage.getItem("foto_perfil");
      setFotoPerfil(foto);
    };
    cargarFotoPerfil();
  }, []);

  const imageUrl = fotoPerfil ? `${URL_API}/avatars/${fotoPerfil}` : null;

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>More</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chats")}
          title="boton"
        >
          <Icon
            name="comment"
            size={24}
            color="white"
            style={styles.chatIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Icon name="home" size={24} color="white" style={styles.iconActive} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Buscar")}
          title="boton"
        >
          <Icon name="search" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Agregar")}
          title="boton"
        >
          <Icon
            name="plus-square"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notificaciones")}
          title="boton"
        >
          <Icon name="heart" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Perfil")}
          title="boton"
        >
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.profilePicSmall} />
          ) : (
            <Icon name="user-circle" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <Navbar />
        <ScrollView>
          <Post
            name="Daniel Sanchez"
            text="Mi anime favorito ❤️"
            profileImage={require("../assets/imagen/WhatsApp Image 2025-03-02 at 7.39.09 PM.jpeg")}
            postImage={require("../assets/imagen/WhatsApp Image 2025-03-02 at 7.39.09 PM.jpeg")}
          />
          <Post
            name="Roussell Duran"
            text="Mi momento favorito del día"
            profileImage={require("../assets/imagen/rousse.jpeg")}
            postImage={require("../assets/imagen/rousse.jpeg")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    // Elimina o comenta la línea de paddingTop si usas SafeAreaView
    // paddingTop: 20,
  },
  navbarContainer: {
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  chatIcon: {
    marginRight: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 15,
    width: "100%",
  },
  icon: {
    marginHorizontal: 10,
  },
  iconActive: {
    color: "#3498db",
  },
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  postContainer: {
    backgroundColor: "#222",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "white",
    fontWeight: "bold",
  },
  postText: {
    color: "white",
  },
  postImage: {
    height: 200,
    borderRadius: 10,
    width: "100%",
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    color: "white",
    marginLeft: 5,
  },
});

export default App;
