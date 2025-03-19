import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Care Connect</Text>
      <Text style={styles.subtitle}>Door-to-Door Health Services</Text>
      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/booking')}>
        <Ionicons name="medkit" size={24} color="#20B2AA" />
        <Text style={styles.cardText}>Book a Health Checkup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/history')}>
        <Ionicons name="time" size={24} color="#20B2AA" />
        <Text style={styles.cardText}>View Health History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/support')}>
        <Ionicons name="help-circle" size={24} color="#20B2AA" />
        <Text style={styles.cardText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
  },
  cardText: { marginLeft: 10, fontSize: 16, color: '#000' },
});

export default Home;