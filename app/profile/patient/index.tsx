import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { getPatientDetails } from '@/services/patient';

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
          title: 'Patient Profile',
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
        <View style={styles.maincontainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImagePlaceholder}></View>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
            >
              {patientDetails?.name?.givenName}{' '}
              {patientDetails?.name?.familyName}
            </Text>
          </View>
          <View>
            <Text style={styles.speciality}>{patientDetails?.email}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Date of Birth:</Text>
          <Text style={styles.infoValue}>
            {new Date(patientDetails?.dob).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sex:</Text>
          <Text style={styles.infoValue}>
            {patientDetails?.administrativeSex}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Marital Status:</Text>
          <Text style={styles.infoValue}>{patientDetails?.maritalStatus}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{patientDetails?.status}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Created At:</Text>
          <Text style={styles.infoValue}>
            {new Date(patientDetails?.createdAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Updated At:</Text>
          <Text style={styles.infoValue}>
            {new Date(patientDetails?.updatedAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Is Deceased:</Text>
          <Text style={styles.infoValue}>
            {patientDetails?.is_deceased === 'Y' ? 'Yes' : 'No'}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 350,
    height: 350,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  speciality: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center', // Align text to the center
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  maincontainer: {
    flex: 1,
    marginTop: 50,
    margin: 30,
    padding: 20, // Add padding for better appearance
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  bio: {
    fontFamily: 'times-roman',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
