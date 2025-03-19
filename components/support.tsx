import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.text}>Contact us at support@careconnect.com</Text>
      <Text style={styles.text}>Call us: +1-800-CARE-CON</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Chat with Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  text: { fontSize: 16, color: '#666', marginBottom: 10 },
  button: { backgroundColor: '#20B2AA', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default Support;