import React, { useState } from 'react';
import { View, Text, Button, TextInput, DatePickerAndroid, StyleSheet } from 'react-native';

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMoodInput = (text) => {
    setMood(text);
  };

  const handleDateSelection = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: selectedDate,
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const submitMoodEntry = () => {
    console.log('Mood:', mood);
    console.log('Selected Date:', selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How are you feeling today?</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your mood"
        onChangeText={handleMoodInput}
      />

      <Button title="Select Date" onPress={handleDateSelection} />

      <Text style={styles.dateText}>Date: {selectedDate.toDateString()}</Text>

      <Button title="Submit Mood Entry" onPress={submitMoodEntry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set the background color
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  dateText: {
    marginTop: 10,
  },
});
