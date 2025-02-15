import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

export default function ForgotPassword({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reset Password</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
