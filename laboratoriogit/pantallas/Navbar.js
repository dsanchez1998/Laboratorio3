import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>More</Text>
        <Icon name="comment" size={24} color="white" style={styles.chatIcon} />
      </View>
      <View style={styles.navbar}>
        <Icon name="home" size={24} color="white" style={styles.icon} />
        <Icon name="search" size={24} color="white" style={styles.icon} />
        <Icon name="plus-square" size={24} color="white" style={styles.icon} />
        <Icon name="heart" size={24} color="white" style={styles.icon} />
        <View style={styles.profilePicSmall} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#555',
    marginLeft: 10,
  },
});

export default Navbar;
