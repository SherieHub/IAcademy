import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';

// --- MOCK DATA ---
const CEBU_PUBLIC_SCHOOLS = [
  'Abellana National School',
  'Camp Lapu-Lapu National High School',
  'Cebu City National Science High School',
  'City Central Elementary School',
  'Don Vicente Rama Memorial National High School',
  'Mabolo National High School',
  'Ramon Duterte Memorial National High School'
];

const GRADE_LEVELS = ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const QUARTERS = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
const SUBJECTS = ['Biology', 'Mathematics', 'English', 'Araling Panlipunan', 'Filipino'];

export default function OnboardingScreen() {
  // --- STATE ---
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [quarter, setQuarter] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Offline Learn.</Text>
          <Text style={styles.subtitle}>Let's set up your offline classroom.</Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Student Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            label="Select School"
            placeholder="Select a school..."
            isDropdown
            options={CEBU_PUBLIC_SCHOOLS}
            value={school}
            onSelect={setSchool}
          />
          <CustomInput
            label="Grade Level"
            placeholder="Select grade..."
            isDropdown
            options={GRADE_LEVELS}
            value={grade}
            onSelect={setGrade}
          />
          <CustomInput
            label="Quarter"
            placeholder="Select quarter..."
            isDropdown
            options={QUARTERS}
            value={quarter}
            onSelect={setQuarter}
          />
          <CustomInput
            label="Subject"
            placeholder="Select subject..."
            isDropdown
            options={SUBJECTS}
            value={subject}
            onSelect={setSubject}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Find My Lessons"
          onPress={() => router.push('/selection')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 24, flexGrow: 1 },
  header: { marginBottom: 32, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary },
  form: { flex: 1 },
  footer: { padding: 24, backgroundColor: Colors.surface, borderTopWidth: 1, borderColor: Colors.border },
});