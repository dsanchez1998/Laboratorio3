import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ navigation }) => {
  // Datos de los chats con imágenes personalizadas
  const chats = [
    {
      id: '1',
      name: 'Emmanuel',
      date: '03/03/2023',
      message: 'Hola Amigo, me gustan tus fotos.',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.13.34 AM.jpeg')
    },
    {
      id: '2',
      name: 'Bradley Cooper',
      date: '03/03/2023',
      message: 'La canción Black Eyes es la mujer.',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.13.49 AM.jpeg')
    },
    {
      id: '3',
      name: 'Emil Navas',
      date: '03/03/2023',
      message: 'Xenex sigue en el descanso?',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.15.00 AM.jpeg')
    },
    {
      id: '4',
      name: 'Yenika Rojas',
      date: '03/03/2023',
      message: 'Fritz cumpleaños túb.',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 2.20.49 PM.jpeg')
    },
    {
      id: '5',
      name: 'Adriannyz Suarez',
      date: '03/03/2023',
      message: 'Yo te compro los dolores $',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-02-23 at 5.48.54 PM.jpeg')
    },
    {
      id: '6',
      name: 'Sophia Estrada',
      date: '03/03/2023',
      message: 'Sophia, necesito que hagas el logo.',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.39.06 AM.jpeg')
    },
    {
      id: '7',
      name: 'Violet Myers',
      date: '03/03/2023',
      message: 'Hola, soy tu mayor familia.',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.41.37 AM.jpeg')
    },
    {
      id: '8',
      name: 'María Sofia',
      date: '03/03/2023',
      message: 'Como has estado?',
      read: true,
      online: true,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.45.02 AM.jpeg')
    },
    {
      id: '9',
      name: 'Victor Garcia',
      date: '03/03/2023',
      message: 'Esele man, como has estado?',
      read: false,
      online: false,
      avatar: require('../assets/Avatars/WhatsApp Image 2025-03-03 at 11.46.39 AM.jpeg')
    }
  ];

  const handleChatPress = (chat) => {
    navigation.navigate('Chats2', { chat });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={item.avatar} 
          style={styles.avatar}
        />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatDate}>{item.date}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.chatMessage,
              !item.read && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
          {item.read && (
            <Icon name="check" size={14} color="#4FC3F7" style={styles.readIcon} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sección "En Linea" */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>En Linea</Text>
      </View>

      {/* Lista de chats */}
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:130
  },
  chatList: {
    paddingBottom: 15,
    
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#1e1e1e',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatDate: {
    color: '#888',
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatMessage: {
    color: '#888',
    fontSize: 14,
    flex: 1,
    marginRight: 5,
  },
  unreadMessage: {
    color: 'white',
    fontWeight: 'bold',
  },
  readIcon: {
    marginLeft: 5,
  }
});

export default ChatScreen;