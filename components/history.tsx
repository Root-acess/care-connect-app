import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, database } from '../src/config/firebaseConfig'; // Updated path
import { ref, onValue } from 'firebase/database';

interface Booking {
  id: string;
  service: string;
  date: string;
  status: string;
  createdAt: string;
  userId?: string;
}

const History = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const bookingsRef = ref(database, 'bookings');
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookingList: Booking[] = Object.keys(data)
          .filter((key) => data[key].userId === user.uid)
          .map((key) => ({
            id: key,
            ...data[key],
          }));
        setBookings(bookingList);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Checkup History</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Service: {item.service}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No bookings found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 10 },
});

export default History;