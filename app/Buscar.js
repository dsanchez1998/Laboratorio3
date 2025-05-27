import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = ({ searchText, setSearchText }) => {
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
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#888"
          style={styles.searchBox}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
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

const CATEGORY_LIST = ["Anime", "Comida", "Gym", "Viajes"];

const Categories = ({ selected, onSelect }) => (
  <View style={styles.categories}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        style={[
          styles.categoryItem,
          !selected && { backgroundColor: "#3498db" },
        ]}
        onPress={() => onSelect(null)}
      >
        <Text style={styles.categoryText}>Todas</Text>
      </TouchableOpacity>
      {CATEGORY_LIST.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryItem,
            selected === cat && { backgroundColor: "#3498db" },
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text style={styles.categoryText}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const Gallery = ({ publicaciones, onImagePress }) => (
  <ScrollView style={styles.gallery}>
    <View style={styles.imageGrid}>
      {publicaciones.map((pub, index) => (
        <View
          key={pub.id}
          style={index === 9 ? styles.largeImageWrapper : styles.imageWrapper}
        >
          <TouchableOpacity onPress={() => onImagePress(pub)}>
            <Image
              source={{ uri: `${URL_API}/posts/${pub.fotos}` }}
              style={index === 9 ? styles.largeImage : styles.image}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>
);

const App = () => {
  const navigation = useNavigation();
  const [publicaciones, setPublicaciones] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const response = await fetch(`${URL_API}/todaslaspublicaciones`);
        const data = await response.json();
        setPublicaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar imagenes de publicacion:", error);
        setPublicaciones([]);
      }
    };

    cargarImagenes();
  }, []);

  // Filtrado por categoría y búsqueda
  const publicacionesFiltradas = publicaciones.filter((p) => {
    // Si hay categoría seleccionada, filtra solo por categoría
    if (categoria) {
      return (p.etiquetas || "")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
        .includes(categoria.toLowerCase());
    }
    // Si no hay categoría, filtra por búsqueda si hay texto
    if (searchText.trim() !== "") {
      const texto = searchText.toLowerCase();
      const usuario = (p.usuario || "").toLowerCase();
      const etiquetas = (p.etiquetas || "").toLowerCase();
      const contenido = (p.description || "").toLowerCase();
      return (
        usuario.includes(texto) ||
        etiquetas.includes(texto) ||
        contenido.includes(texto)
      );
    }
    // Si no hay búsqueda ni categoría, muestra todo
    return true;
  });

  const handleImagePress = (pub) => {
    navigation.navigate("Fotocomentarios", {
      uri: `${URL_API}/posts/${pub.fotos}`,
      uriUser: `${URL_API}/avatars/${pub.foto_perfil}`,
      publicacion_id: pub.id,
      usuario: pub.usuario,
      contenido: pub.description,
      fecha: pub.fecha,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Categories selected={categoria} onSelect={setCategoria} />
      <Gallery
        publicaciones={publicacionesFiltradas}
        onImagePress={handleImagePress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 25,
  },
  navbarContainer: {
    width: "100%",
    backgroundColor: "#111",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  chatIcon: {
    padding: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  icon: {
    color: "white",
  },
  iconActive: {
    color: "#3498db",
  },
  profilePicSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  categories: {
    paddingVertical: 10,
    alignItems: "center",
  },
  categoryItem: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#222",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: "white",
    fontSize: 14,
  },
  gallery: {
    flex: 1,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "32%",
    aspectRatio: 1,
    marginBottom: 5,
  },
  largeImageWrapper: {
    width: "100%",
    aspectRatio: 2,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  largeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default App;
