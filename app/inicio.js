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

const Post = ({
  name,
  text,
  profileImage,
  postImage,
  publicacionId,
  authorId,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioName, setUsuarioName] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarUsuarioId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUsuarioId(id);
      const name = await AsyncStorage.getItem("nombreCompleto");
      setUsuarioName(name);
    };
    cargarUsuarioId();
  }, []);

  const toggleLike = async () => {
    if (!usuarioId || !publicacionId) return;
    try {
      const res = await fetch(`${URL_API}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuarioId,
          publicacion_id: publicacionId,
        }),
      });
      const data = await res.json();
      setLiked(data.liked);
      alert(
        data.liked
          ? "Te gusta esta publicación"
          : "Ya no te gusta esta publicación"
      );

      // Notificar al dueño si no es el mismo usuario
      if (usuarioId !== authorId && data.liked) {
        await fetch(`${URL_API}/agregar-notificacion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "like",
            idusuario: usuarioId,
            idpublicacion: publicacionId,
            mensaje: `${usuarioName} le dio me gusta a tu publicación.`,
          }),
        });
      }
    } catch (e) {
      alert("Error al dar like");
      setLiked(false);
    }
  };

  const handleComment = () => {
    navigation.navigate("Fotocomentarios", {
      uri: postImage?.uri || null,
      uriUser: profileImage?.uri || null,
      publicacion_id: publicacionId,
      usuario: name,
      contenido: text,
      authorId: authorId,
    });
  };

  const toggleSave = async () => {
    if (!usuarioId || !publicacionId) return;
    try {
      const res = await fetch(`${URL_API}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuarioId,
          publicacion_id: publicacionId,
        }),
      });
      const data = await res.json();
      setSaved(data.saved);
      alert(data.saved ? "Guardado en favoritos" : "Eliminado de favoritos");
    } catch (e) {
      alert("Error al guardar");
      setSaved(false);
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profilePic} />
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.postText}>{text}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleComment}>
        <Image source={postImage} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
          <Icon name="heart" size={20} color={liked ? "red" : "white"} />
          <Text style={styles.actionText}>Me gusta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment} style={styles.actionButton}>
          <Icon name="comment" size={20} color="white" />
          <Text style={styles.actionText}>Comentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleSave}>
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndPosts = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);

        const response = await fetch(`${URL_API}/todaslaspublicaciones`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserIdAndPosts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <Navbar />
        <ScrollView>
          {loading ? (
            <Text
              style={{ color: "white", textAlign: "center", marginTop: 20 }}
            >
              Cargando publicaciones...
            </Text>
          ) : (
            posts
              // .filter(
              //   (post) =>
              //     // Solo mostrar publicaciones que NO sean del usuario de la sesión
              //     post.usuario_id?.toString() !== userId?.toString()
              // )
              .map((post) => (
                <Post
                  key={post.id}
                  name={post.usuario}
                  text={post.description}
                  publicacionId={post.id}
                  authorId={post.usuario_id}
                  profileImage={
                    post.foto_perfil
                      ? { uri: `${URL_API}/avatars/${post.foto_perfil}` }
                      : null
                  }
                  postImage={
                    post.fotos
                      ? { uri: `${URL_API}/posts/${post.fotos}` }
                      : null
                  }
                />
              ))
          )}
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
