import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native'
import {validatePassword, validateUsername} from '../utils/Validation';
import axios from 'axios';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const [error, setError] = useState('');
  // const navigation = useNavigation();

  const isMounted = React.useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const passwordShowIcon = require('../assets/eye.png');
  const passwordHideIcon = require('../assets/hidden.png');

  const login = async () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    if (usernameError || passwordError) {
      if (isMounted.current) {
        setError(usernameError || passwordError);
        setTimeout(() => setError(''), 2500);
        return;
      }
    }
    try {
      const response = await axios.post('http://192.168.29.17:5002/login', {
        username,
        password,
      });
      const result = response.data;
      if (result.status === 'SUCCESS' && result.data) {
        console.log(result.message);
        navigation.replace('Home', {username});
        if (isMounted.current) {
          setUsername('');
          setPassword('');
        }
      } else {
        if (isMounted.current) {
          setError(`${result.message}! Please enter correct credentials`);
          setTimeout(() => setError(''), 2500);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        console.error('Error while logging: ', error);
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={{
              uri: 'https://www.civilglobe.co.in/assets/images/logo/civillogo.png',
            }}
            style={styles.logo}
          />
          <View style={styles.userContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username..."
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.userIcon}>
              <Image
                source={require('../assets/user.png')}
                style={{height: 25, width: 25}}
              />
            </View>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry={showPassword}
            />
            <View style={styles.passwordIcon}>
              <Image
                source={require('../assets/padlock.png')}
                style={{height: 25, width: 25}}
              />
            </View>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Image
                source={showPassword ? passwordShowIcon : passwordHideIcon}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.text}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button title="Login" onPress={login} />
          </View>
          <View style={styles.registerContainer}>
            <Text>Don't Have Any Account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inner: {
    padding: 24,
  },
  btnContainer: {
    marginTop: 20,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    paddingLeft: 50,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  passwordContainer: {
    position: 'relative',
  },
  userContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    marginTop: 2,
  },
  userIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  passwordIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  text: {
    fontSize: 14,
    color: '#4834DF',
    position: 'absolute',
    right: 10,
    top: -10,
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  registerText: {
    color: '#4834DF',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    marginBottom: 12,
  },
});
