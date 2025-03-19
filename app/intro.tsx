import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define your stack's route parameters (adjusted for Expo Router)
type RootStackParamList = {
  intro: undefined; // Match file name if app/intro.tsx
  login: undefined; // Match file name if app/login.tsx
};

type IntroScreenProps = NativeStackScreenProps<RootStackParamList, "intro">;

const Intro = ({ navigation }: IntroScreenProps) => {
  const { width, height } = Dimensions.get("window");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slide);
  };

  const slides = [
    "Welcome to Care Connect! Your solution for home health check-ups.",
    "Schedule door-to-door check-ups with trusted clinics.",
    "Browse clinic profiles and pick the best fit for you.",
    "Track your appointments and health history with ease.",
    "Ready to begin? Sign up or log in now!",
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          onScroll={handleScroll}
        >
          {slides.map((text, index) => (
            <View
              key={index}
              style={{ width, height, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontSize: 20, textAlign: "center" }}>{text}</Text>
              {index === slides.length - 1 && (
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => navigation.navigate("login")} // Updated to "login"
                >
                  <Text style={{ fontSize: 18, color: "#007AFF" }}>Get Started</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{ position: "absolute", top: 20, right: 20 }}
                onPress={() => navigation.navigate("login")} // Updated to "login"
              >
                <Text>Skip</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === currentSlide ? "#000" : "#ccc",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Intro;