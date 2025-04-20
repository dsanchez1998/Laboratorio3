import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const ChatScreen = (data) => {
  const chatParams = data.route.params.chat;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Hola Dan. Donde conseguiste esas fotos que bonitas de tu perfil?', 
      time: 'Martes a las 13:30pm',
      isMe: false 
    },
    { 
      id: '2', 
      text: 'Las encontré en un sitio de fotos gratis', 
      time: 'Martes a las 13:32pm',
      isMe: true 
    },
    { 
      id: '3', 
      text: 'Hola Dan. Luego eras los bazos de Facebook, jajadaja.', 
      time: 'Martes a las 13:33pm',
      isMe: false 
    },
    { 
      id: '4', 
      text: 'Jajaja sí, los memes de Facebook son geniales', 
      time: 'Martes a las 13:34pm',
      isMe: true 
    },
    { 
      id: '5', 
      text: 'Jajadaja que facil. Yo pensando que era de una poca específica.', 
      time: 'Martes a las 13:35pm',
      isMe: false 
    },
    { 
      id: '6', 
      text: 'Jajadaja que otra, estupe en la cocina.', 
      time: 'Martes a las 13:36pm',
      isMe: false 
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: (messages.length + 1).toString(),
      text: newMessage,
      time: 'Ahora',
      isMe: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleProfilePress = (profile) => {
    // Add your profile navigation/action here
     
      navigation.navigate("Yerika", {profile})
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with centered profile */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Atras</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.profileContainer} 
           onPress={() => handleProfilePress(chatParams)}
          activeOpacity={0.7}
        >
          <View style={styles.profileInfo}>
            <Image 
              style={styles.profileImage}
              source={chatParams.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{chatParams.name}</Text>
              <Text style={styles.profileStatus}>En línea</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Messages list */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.isMe ? styles.myMessage : styles.otherMessage
          ]}>
            <Text style={styles.messageTime}>{item.time}</Text>
            <Text style={[
              styles.messageText,
              item.isMe ? styles.myMessageText : styles.otherMessageText
            ]}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />
      
      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    marginTop: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileText: {
    alignItems: 'center',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  profileStatus: {
    fontSize: 12,
    color: 'green',
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E90FF',
    marginLeft: '20%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginRight: '20%',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;