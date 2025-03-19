import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index" // Set dashboard as the initial screen
      screenOptions={{
        headerShown: false, // Hide headers
        tabBarShowLabel: false, // Hide labels, show icons only
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60, // Increase height for better icon visibility
        },
      }}
    >
      {/* Booking Tab */}
      <Tabs.Screen
        name="booking"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={28}
              color={focused ? "#007AFF" : "#666"}
            />
          ),
        }}
      />

      {/* Dashboard Tab (Index) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={28}
                color={focused ? "#007AFF" : "#666"}
              />
            </View>
          ),
        }}
      />

      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={focused ? "#007AFF" : "#666"}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={focused ? "#007AFF" : "#666"}
            />
          ),
        }}
      />
    </Tabs>
  );
}