import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
        const userToken = await AsyncStorage.getItem("userToken");
        setIsFirstLaunch(hasSeenIntro === null);
        setIsLoggedIn(!!userToken);
      } catch (error) {
        console.error("Error loading app state:", error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="intro" />
      ) : isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}