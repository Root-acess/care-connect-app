import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../src/config/firebaseConfig'; // Adjust path
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/login');
    } catch (error) {
      alert('Signup failed: ');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/background.webp')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Join Care Connect</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#bbb" />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  input: { width: '90%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' },
  button: { width: '90%', backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#fff', fontSize: 14, marginTop: 10 },
});

export default Signup;