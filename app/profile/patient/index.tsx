import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useQuery } from 'react-query';
import { getPatientDetails } from '@/services/patient';
import { SvgXml } from 'react-native-svg';

type PatientProfilePageProps = {};

export default function PatientProfilePage(props: PatientProfilePageProps) {
  const { id } = useLocalSearchParams();
  const { data: patientDetails } = useQuery(['patient', id], () =>
    getPatientDetails(Number(id))
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SvgXml
              xml={`<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" fill="none">
                <text x="10" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1A365D">
                  Reach 
                </text>
                <text x="80" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#805AD5">
                  Specialist
                </text>
                <path d="M50 20 L65 5 L80 20" stroke="#1A365D" stroke-width="4" fill="none"/>
                <circle cx="65" cy="5" r="3" fill="#805AD5"/>
              </svg>`}
              width={160}
              height={48}
            />
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7FAFC',
                backgroundImage:
                  'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
              }}
            />
          ),
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#F7FAFC',
          },
          headerTintColor: '#1A365D',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 20,
          },
        }}
      />
      <ScrollView style={styles.page}>
        <View style={styles.mainContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',
            }}
            style={styles.imageContainer}
          />
          <Text style={styles.name}>
            {patientDetails?.name?.givenName} {patientDetails?.name?.familyName}
          </Text>
          <Text style={styles.speciality}>{patientDetails?.email}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{patientDetails?.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>DOB:</Text>
            <Text style={styles.infoValue}>
              {new Date(patientDetails?.dob).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Marital Status:</Text>
            <Text style={styles.infoValue}>
              {patientDetails?.maritalStatus}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Administrative Sex:</Text>
            <Text style={styles.infoValue}>
              {patientDetails?.administrativeSex}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{patientDetails?.status}</Text>
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
    borderColor: '#805AD5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  speciality: {
    fontSize: 18,
    color: '#805AD5',
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
