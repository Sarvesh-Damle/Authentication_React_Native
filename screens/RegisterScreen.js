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
  ScrollView,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  // const navigation = useNavigation();
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [show, setShow] = useState(false);

  const passwordShowIcon = require('../assets/eye.png');
  const passwordHideIcon = require('../assets/hidden.png');
  const confirmPasswordShowIcon = require('../assets/eye.png');
  const confirmPasswordHideIcon = require('../assets/hidden.png');

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(
        'User Registered Successfully!',
        'Username: ' + username,
        'Password: ' + password,
      );
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('Login');
    }
  };

  const validateForm = () => {
    if (password === confirmPassword) {
      return username.length > 0 && password.length > 0;
    }
    return <Text>Passwords do not match</Text>;
  };

  // const onChange = (event, selectedDate) => {
  //   console.log("event: ", event)
  //   console.log("Selected Date: ", selectedDate)
  //   const currentDate = selectedDate || date;
  //   // setShow(false);
  //   setDate(currentDate);
  //   console.log('Hi');
  // };

  const handleDatechange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    alert('Date changed');
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        behavior="padding"
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
            <View style={styles.fullNameContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter full name..."
                value={fullName}
                onChangeText={setFullName}
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/name_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.userContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username..."
                value={username}
                onChangeText={setUsername}
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/user.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.emailContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter email..."
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/email_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={showPassword}
                autoCapitalize="none"
                autoCorrect={false}
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
            <View style={styles.confirmPasswordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm password..."
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.passwordIcon}>
                <Image
                  source={require('../assets/confirm_password_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.hideIcon}>
                <Image
                  source={
                    showConfirmPassword
                      ? confirmPasswordShowIcon
                      : confirmPasswordHideIcon
                  }
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Phone Number..."
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/phone_icon.png')}
                  style={{height: 21, width: 21}}
                />
              </View>
            </View>
            <View style={styles.birthContainer}>
              {/* <TouchableOpacity onPress={() => setShow(true)}> */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter DOB (DD/MM/YY)..."
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  // editable={false}
                />
                <View style={styles.userIcon}>
                  <Image
                    source={require('../assets/calendar_icon.png')}
                    style={{height: 25, width: 25}}
                  />
                </View>
              {/* </TouchableOpacity> */}
              {/* {show && (
                <View>
                  <Text>Hi</Text>
                  <DateTimePicker
                    value={new Date()}
                    // dateFormat="date month year"
                    mode="date"
                    display='default'
                    onChange={() => console.log("Hi")}
                    style={{ width: "100%" }}
                  />
                </View>
              )} */}
            </View>
            <View style={styles.genderContainer}>
              <TextInput
                style={styles.input}
                placeholder="Gender..."
                value={gender}
                onChangeText={setGender}
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/gender_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.countryContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your country name..."
                value={country}
                onChangeText={setCountry}
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/country_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.cityContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your city..."
                value={city}
                onChangeText={setCity}
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/city_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.addressContainer}>
              <TextInput
                style={[styles.input, styles.multiLineText]}
                placeholder="Enter your address..."
                value={address}
                onChangeText={setAddress}
                multiline
              />
              <View style={styles.userIcon}>
                <Image
                  source={require('../assets/address_icon.png')}
                  style={{height: 25, width: 25}}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button title="Sign Up" onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: 12,
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
  userContainer: {
    position: 'relative',
  },
  passwordContainer: {
    position: 'relative',
  },
  confirmPasswordContainer: {
    position: 'relative',
  },
  birthContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    marginTop: 2,
  },
  hideIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    marginTop: 2,
  },
  passwordIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
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
  multiLineText: {
    minHeight: 40,
  },
  dateTimePicker: {
    width: 320,
    backgroundColor: 'white',
  },
});
