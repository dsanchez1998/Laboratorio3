import React, { useState, useEffect } from "react";
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
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <View style={styles.topBar}></View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Icon name="home" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Buscar")}>
          <Icon
            name="search"
            size={24}
            color="white"
            style={styles.iconActive}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Agregar")}>
          <Icon
            name="plus-square"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
          <Icon name="heart" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Image source={{ uri: imageUrl }} style={styles.profilePicSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Post = ({
  isKeyboardVisible,
  uri,
  profilePic,
  userName,
  contenido,
  publicacionId,
  authorId,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [sessionUserName, setSessionUserName] = useState(null);
  useEffect(() => {
    const cargarUsuarioId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUsuarioId(id);
      const name = await AsyncStorage.getItem("nombreCompleto");
      sessionUserName(name);
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

      if (usuarioId !== authorId && data.liked) {
        await fetch(`${URL_API}/agregar-notificacion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "like",
            idusuario: usuarioId,
            idpublicacion: publicacionId,
            mensaje: `${sessionUserName} le dio me gusta a tu publicación.`,
          }),
        });
      }
    } catch (e) {
      alert("Error al dar like");
      setLiked(false);
    }
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
      <View style={styles.postHeader}>
        <TouchableOpacity>
          <Image source={{ uri: profilePic }} style={styles.profilePicLarge} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text style={styles.postUser}>{userName}</Text>
            <Text style={styles.postTime}>{contenido}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: uri }}
        style={[styles.postImage, isKeyboardVisible && styles.postImageSmall]}
      />

      <View style={styles.postActions}>
        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name="heart"
            size={24}
            color={liked ? "red" : "white"}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSave}>
          <Icon
            name="bookmark"
            size={24}
            color={saved ? "gold" : "white"}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Comments = ({ publicacionId, authorId, authorName }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const [sessionUserName, setSessionUserName] = useState(null);

  useEffect(() => {
    if (!publicacionId) return;
    fetch(`${URL_API}/comentarios?publicacion_id=${publicacionId}`)
      .then((res) => res.json())
      .then((data) => setComentarios(data))
      .catch(() => setComentarios([]));
  }, [publicacionId]);

  // Obtener usuario_id desde AsyncStorage (o tu método preferido)
  useEffect(() => {
    const cargarUsuarioId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUsuarioId(id);
      const name = await AsyncStorage.getItem("nombreCompleto");
      setSessionUserName(name);
    };
    cargarUsuarioId();
  }, []);

  const sendComment = async () => {
    if (!nuevoComentario.trim() || !usuarioId) return;
    try {
      const res = await fetch(`${URL_API}/agregar-comentario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicacion_id: publicacionId,
          usuario_id: usuarioId,
          comentario: nuevoComentario,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setNuevoComentario("");
        // Recargar comentarios
        fetch(`${URL_API}/comentarios?publicacion_id=${publicacionId}`)
          .then((res) => res.json())
          .then((data) => setComentarios(data))
          .catch(() => {});

        // Notificar al dueño si no es el mismo usuario
        if (usuarioId !== authorId) {
          await fetch(`${URL_API}/agregar-notificacion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tipo: "comentario",
              idusuario: usuarioId,
              idpublicacion: publicacionId,
              mensaje: `${sessionUserName} comentó en tu publicación.`,
            }),
          });
        }
      }
    } catch (e) {
      alert("Error al enviar el comentario");
    }
  };

  return (
    <View style={styles.commentsContainer}>
      <ScrollView style={{ maxHeight: 130 }}>
        {Array.isArray(comentarios) && comentarios.length > 0 ? (
          comentarios.map((c) => (
            <Text style={styles.comment} key={c.id}>
              <Text style={styles.commentUser}>
                {c.nombre} {c.apellido}:
              </Text>{" "}
              {c.comentario}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#aaa" }}>No hay comentarios.</Text>
        )}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          placeholderTextColor="#aaa"
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
        />
        <TouchableOpacity onPress={sendComment} style={styles.sendButton}>
          <Icon name="send" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = ({ route }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { uri, uriUser, publicacion_id, contenido, usuario, authorId } =
    route.params;

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Navbar />
      <ScrollView>
        {/* Muestra la imagen recibida */}
        <Post
          isKeyboardVisible={keyboardVisible}
          uri={uri}
          profilePic={uriUser}
          userName={usuario}
          contenido={contenido}
          publicacionId={publicacion_id}
        />
        {/* Consulta los comentarios usando el id recibido */}
        <Comments
          publicacionId={publicacion_id}
          authorId={authorId}
          authorName={usuario}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
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
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postUser: {
    color: "white",
    fontWeight: "bold",
  },
  postTime: {
    color: "gray",
    fontSize: 12,
  },
  postImage: {
    width: "100%",
    height: 350,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: "cover",
  },
  postImageSmall: {
    height: 200, // cuando aparece el teclado
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  commentsContainer: {
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 10,
    margin: 10,
  },
  comment: {
    color: "white",
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    color: "white",
    flex: 1, // Para que ocupe el espacio disponible
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 20,
  },
});

export default App;
