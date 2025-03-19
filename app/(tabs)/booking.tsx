import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { auth, firestore } from '../../src/config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Booking = () => {
  const [service, setService] = useState('Blood Pressure Check');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleBooking = async () => {
    if (!date) return alert('Please enter a date');

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      await addDoc(collection(firestore, 'bookings'), {
        userId: user.uid,
        service,
        date,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      });
      alert('Booking successful!');
      router.push('./components/history'); // Adjust path if needed
    } catch (error) {
      alert('Error booking: ' + (error as Error).message); // Type assertion added
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Health Checkup</Text>
      <Picker
        selectedValue={service}
        style={styles.picker}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        <Picker.Item label="Blood Pressure Check" value="Blood Pressure Check" />
        <Picker.Item label="Diabetes Check" value="Diabetes Check" />
        <Picker.Item label="General Health Check" value="General Health Check" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Preferred Date (e.g., 2025-03-15)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  picker: { width: '80%', height: 50, marginBottom: 20 },
  input: { width: '80%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 20 },
  button: { backgroundColor: '#20B2AA', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Booking;