import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';

export default function HomeScreen({route, navigation}) {
  const {username} = route.params;

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {cancelable: false},
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
          <Text style={styles.navText}>Home</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile', {username})}>
          <Image
            source={require('../assets/profile_icon.png')}
            style={{height: 28, width: 28}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Home Section</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 22,
  },
});
