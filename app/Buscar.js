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

  const handleNavPress = (section) => {
    console.log(`Navegando a ${section}`);
  };

  const handleChatPress = () => {
    console.log("Abrir mensajes");
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchBox}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Icon
            name="comment"
            size={24}
            color="white"
            style={styles.chatIcon}
          />
        </TouchableOpacity>
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

const Categories = () => {
  return (
    <View style={styles.categories}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {["Anime", "Comida", "Gym", "Viajes"].map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Gallery = () => {
  const navigation = useNavigation();
  const imageUris = [
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg"),
    require("../assets/imagen/GEThHg_bwAAdeR1.jpg"),
    require("../assets/imagen/3af3aba6a0ecec50f9dbd62f5684da4f.jpg"),
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.32.18 PM.jpeg"),
    require("../assets/imagen/Kenjaku-is-the-Aizen-of-Jujutsu-Kaisen-Unavoidable-future-looming-near-5.webp"),
    require("../assets/imagen/Mre.png"),
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg"),
    require("../assets/imagen/a-spectacular-gaming-adventure-with-this-stunning-4k-wallpaper-free-photo.jpg"),
    require("../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.12 PM.jpeg"),
    require("../assets/imagen/WhatsApp Image 2025-03-02 at 7.41.38 PM.jpeg"), // Imagen grande
  ];

  const handleImagePress = (imgUri) => {
    navigation.navigate("Fotocomentarios", { uri: imgUri });
  };

  return (
    <ScrollView style={styles.gallery}>
      <View style={styles.imageGrid}>
        {imageUris.map((uri, index) => (
          <View
            key={index}
            style={index === 9 ? styles.largeImageWrapper : styles.imageWrapper}
          >
            <TouchableOpacity onPress={() => handleImagePress(uri)}>
              <Image
                source={uri}
                style={index === 9 ? styles.largeImage : styles.image}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <Categories />
      <Gallery />
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
