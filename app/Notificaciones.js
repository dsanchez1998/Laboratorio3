import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Si usas React Navigation, descomenta la línea de abajo
// import { useNavigation } from '@react-navigation/native';

const NotificationItem = ({ name, action, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.notificationItem}>
      <Image source={image} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.action}>{action}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  //función para obtener detalles de la publicación
  const goToPostDetail = async (item) => {
    try {
      // Consultar detalles de la publicación usando el publicacion_id
      const res = await fetch(`${URL_API}/todaslaspublicaciones`);
      const posts = await res.json();
      const post = posts.find((p) => p.id === item.publicacion_id);

      if (!post) {
        alert("No se encontró la publicación.");
        return;
      }

      navigation.navigate("Fotocomentarios", {
        uri: post.fotos ? `${URL_API}/posts/${post.fotos}` : null,
        uriUser: post.foto_perfil
          ? `${URL_API}/avatars/${post.foto_perfil}`
          : null,
        publicacion_id: post.id,
        usuario: post.usuario,
        contenido: post.description,
        authorId: post.usuario_id,
      });
    } catch (e) {
      alert("No se pudo cargar la publicación.");
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await fetch(
          `${URL_API}/notificaciones?usuario_id=${userId}`
        );
        const data = await res.json();
        setNotifications(data);
      } catch (e) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scroll}>
        {loading ? (
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            Cargando notificaciones...
          </Text>
        ) : notifications.length === 0 ? (
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No tienes notificaciones.
          </Text>
        ) : (
          notifications.map((item, index) => (
            <NotificationItem
              key={item.id}
              name={`${item.emisor_nombre} ${item.emisor_apellido}`}
              action={item.mensaje}
              image={
                item.foto_perfil
                  ? { uri: `${URL_API}/avatars/${item.foto_perfil}` }
                  : null
              }
              onPress={() => goToPostDetail(item)}
            />
          ))
        )}
      </ScrollView>
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
      <View style={styles.topBar}></View>

      <View style={styles.navbar}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Icon name="home" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Buscar')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Buscar")}>
          <Icon name="search" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('CrearPublicacion')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Agregar")}>
          <Icon
            name="plus-square"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
          <Icon name="heart" size={24} color="skyblue" style={styles.icon} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Perfil')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Image source={{ uri: imageUrl }} style={styles.profilePicSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  action: {
    color: "white",
    fontSize: 13,
  },
  navbarContainer: {
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default NotificationsScreen;
