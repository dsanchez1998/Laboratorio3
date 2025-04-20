import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
// Si usas React Navigation, descomenta la línea de abajo
// import { useNavigation } from '@react-navigation/native';

const notifications = [
  { name: 'Sabo', action: 'Le gustó tu publicación', image: require('../assets/imagen/WhatsApp Image 2025-03-02 at 7.38.32 PM.jpeg') },
  { name: 'Bradley Cooper', action: 'Comentó tu publicación', image: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.13.49 AM.jpeg') },
  { name: 'Victor García', action: 'Le gustó tu publicación', image: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.46.39 AM.jpeg') },
  { name: 'Bradley Cooper', action: 'Comentó tu publicación', image: require('../assets/imagen/GEThHg_bwAAdeR1.jpg') },
  { name: 'Nami', action: 'Le gustó tu publicación', image: require('../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg') },
  { name: 'Monkey D Luffy', action: 'Le gustó tu publicación', image: require('../assets/imagen/WhatsApp Image 2025-03-03 at 5.33.56 PM.jpeg') },
  { name: 'Peter Parker', action: 'Dejó un comentario', image: require('../assets/imagen/a-spectacular-gaming-adventure-with-this-stunning-4k-wallpaper-free-photo.jpg') },
  { name: 'Bradley Cooper', action: 'Le gustó tu publicación', image: require('../assets/imagen/WhatsApp Image 2025-03-03 at 5.32.18 PM.jpeg') },
  { name: 'Joe Verde', action: 'Le gustó tu publicación', image: require('../assets/imagen/jkcaptura (9).png') },
];

const NotificationItem = ({ name, action, image }) => {
  // const navigation = useNavigation(); // Descomenta si usas navegación

  const handlePress = () => {
    // Aquí podrías navegar a otra pantalla con React Navigation:
    // navigation.navigate('DetalleNotificacion', { user: name });

    // Por ahora, solo mostramos una alerta
    Alert.alert('Notificación', `${name} ${action}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.notificationItem}>
      <Image source={image} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.action}>{action}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scroll}>
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            name={item.name}
            action={item.action}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Navbar = () => {
  const navigation = useNavigation();
  // const navigation = useNavigation(); // Descomenta si vas a usar navegación

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>More</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Mensajes')}> */}
        {/* Esto solo muestra alerta en lugar de navegación */}
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Icon name="comment" size={24} color="white" style={styles.chatIcon} />
        </TouchableOpacity>
      </View>

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
          <Icon name="plus-square" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
          <Icon name="heart" size={24} color="skyblue" style={styles.icon} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Perfil')}> */}
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Image source={require('../assets/imagen/daniel.jpeg')} style={styles.profilePicSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  action: {
    color: 'white',
    fontSize: 13,
  },
  navbarContainer: {
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default NotificationsScreen;
