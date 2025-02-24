import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
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
        <View style={styles.maincontainer}>
          <Image
            source={{ uri: providerDetails?.photoUrl }}
            style={styles.imagecontainer}
          ></Image>
          <Text style={styles.name}>
            {providerDetails?.name?.givenName}{' '}
            {providerDetails?.name?.familyName}
          </Text>
          <Text style={styles.bio}>{providerDetails?.bio}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  speciality: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  maincontainer: {
    flex: 1,
    marginTop: 50,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  imagecontainer: {
    height: 300,
    width: 220,
  },
  bio: {
    fontFamily: 'times-roman',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
