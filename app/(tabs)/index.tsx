import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView as RNScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<RNScrollView>(null);
  const userName = "John";
  const upcomingAppointments = [
    { date: "Oct 25", time: "10:00 AM", clinic: "Dr. Smith Clinic" },
    { date: "Nov 1", time: "2:00 PM", clinic: "HealthFirst Clinic" },
  ];
  const healthReminder = "Next check-up in 3 days";

  const sliderImages = [
    { source: require("../../assets/images/img1.jpg") },
    { source: require("../../assets/images/img2.jpg") },
    { source: require("../../assets/images/img3.png") },
    { source: require("../../assets/images/img4.jpg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % sliderImages.length;
      setCurrentSlide(nextSlide);
      scrollRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeSection}>
          <Ionicons
            name="person-circle"
            size={40}
            color="#007AFF"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        </View>

        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentSlide(slide);
            }}
            scrollEventThrottle={16}
          >
            {sliderImages.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  source={image.source}
                  style={styles.slideImage}
                  resizeMode="contain" // Changed from "cover" to "contain"
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {sliderImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index === currentSlide ? "#007AFF" : "#ccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Book Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="business-outline" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>View Clinics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="heart-outline" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Health Status</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {upcomingAppointments.map((appt, index) => (
              <View key={index} style={styles.appointmentCard}>
                <Text style={styles.appointmentText}>
                  {appt.date}, {appt.time}
                </Text>
                <Text style={styles.appointmentText}>{appt.clinic}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.reminderSection}>
          <Text style={styles.reminderText}>{healthReminder}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  welcomeText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },
  sliderContainer: {
    height: 180,
    marginBottom: 20,
  },
  slide: {
    width: width,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center", // Center image vertically
    alignItems: "center", // Center image horizontally
  },
  slideImage: {
    width: width, // Match container width
    height: 180, // Match container height
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  actionCard: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    width: width * 0.28,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  appointmentCard: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: width * 0.7,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
  },
  appointmentText: {
    fontSize: 14,
    color: "#333",
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  reminderSection: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  reminderText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});