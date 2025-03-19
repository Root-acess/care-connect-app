import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../src/config/firebaseConfig'; // Adjust path
import { signOut } from 'firebase/auth';

// Define the type for the user object
interface User {
  name: string;
  email: string;
}

const Profile = () => {
  // Type user as either User or null
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || 'User', // Fallback to 'User' if displayName is null
        email: currentUser.email || '', // Fallback to empty string (email is usually non-null, but TypeScript requires this)
      });
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      {user && (
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/support')}>
          <Text style={styles.menuText}>Contact Us</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: { flexDirection: 'row', alignItems: 'center', height: 60, paddingHorizontal: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#DDD' },
  backButton: { padding: 10 },
  backText: { fontSize: 20, color: '#000' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
  profileSection: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#FFA500', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: '600', color: '#000' },
  email: { fontSize: 16, color: '#666', marginBottom: 20 },
  menu: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#DDD' },
  menuText: { fontSize: 16, color: '#000' },
  logoutText: { fontSize: 16, color: '#D32F2F' },
  chevron: { fontSize: 20, color: '#000' },
});

export default Profile;