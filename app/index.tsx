import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Root() {
  return (
    <>
      <Stack.Screen options={{}} />
      <ThemedView style={styles.container}>
        {/* <Link href="/book/appointment" style={styles.link}>
          <ThemedText type="link">Book Appointment</ThemedText>
        </Link>
        <Link href="/login" style={styles.link}>
          <ThemedText type="link">Login</ThemedText>
        </Link>
        <Link href="/signup" style={styles.link}>
          <ThemedText type="link">Signup</ThemedText>
        </Link> */}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
