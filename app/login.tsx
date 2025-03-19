import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../src/config/firebaseConfig'; // Adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Handlers to update email/password and clear errors
  const handleEmailChange = (text: React.SetStateAction<string>) => {
    setEmail(text);
    setError('');
  };

  const handlePasswordChange = (text: React.SetStateAction<string>) => {
    setPassword(text);
    setError('');
  };

  // Login function with loading state and error handling
  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/(tabs)');
    } catch (error) {
      setError((error as Error).message); // Forces TypeScript to treat error as Error
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.webp')}
        style={styles.background}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome to Care Connect</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log in</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2, // Still valid for Android
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', // Replaces iOS shadow props
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    backgroundColor: '#0033CC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, // Still valid for Android
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)', // Replaces iOS shadow props
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default login;