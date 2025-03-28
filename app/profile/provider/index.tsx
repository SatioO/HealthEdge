import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { getProviderDetails } from '@/services/provider';
import { useQuery } from 'react-query';

type ProviderProfilePageProps = {};

export default function ProviderProfilePage(props: ProviderProfilePageProps) {
  const { id } = useLocalSearchParams();
  const { data: providerDetails } = useQuery(['provider', id], () =>
    getProviderDetails(Number(id))
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          headerShadowVisible: false,
        }}
      ></Stack.Screen>
      <ScrollView style={styles.page}>
        <View style={styles.mainContainer}>
          <Image
            source={{ uri: providerDetails?.photoUrl }}
            style={styles.imageContainer}
          />
          <Text style={styles.name}>
            {providerDetails?.name?.givenName}{' '}
            {providerDetails?.name?.familyName}
          </Text>
          <Text style={styles.speciality}>
            {providerDetails?.specialities?.[0]?.name}
          </Text>
          <Text style={styles.bio}>{providerDetails?.bio}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{providerDetails?.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>DOB:</Text>
            <Text style={styles.infoValue}>
              {new Date(providerDetails?.dob).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>NPI:</Text>
            <Text style={styles.infoValue}>{providerDetails?.npi}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Timezone:</Text>
            <Text style={styles.infoValue}>{providerDetails?.timezone}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Accepting New Patients:</Text>
            <Text style={styles.infoValue}>
              {providerDetails?.acceptingNewPatients ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Website:</Text>
            <Text style={styles.infoValue}>{providerDetails?.websiteUrl}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  speciality: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
});
