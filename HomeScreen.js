import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        setLoggedIn(true);
        console.log('User logged in successfully:', data);
        navigation.navigate('Details');
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      });
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Implement forgot password functionality here.');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Implement Google login functionality here.');
  };

  const handleRegister = () => {
    Alert.alert('Register', 'Implement registration functionality here.');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Screen/logo.jpeg')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="gray"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
        <Image source={require('./Screen/image.png')} style={styles.log} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>New User? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
    color: 'black',
  },
  logo: {
    width: 220,
    height: 220,
    top: -32,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
  },
  googleButton: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    height: 40,
  },
  googleButtonText: {
    color: 'black',
    left: 42,
    top: -28,
  },
  register: {
    marginTop: 20,
    color: 'blue',
  },
  log: {
    width: 40,
    height: 30,
    top: -4,
  }
});

export default LoginScreen;
