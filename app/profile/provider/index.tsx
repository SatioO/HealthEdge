import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import {
  getProviderDetails,
  toggleAcceptingNewPatients,
} from '@/services/provider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '@/components/providers/AuthProvider';
import { SvgXml } from 'react-native-svg';
import Logo from '@/assets/logo/logo';

type ProviderProfilePageProps = {};

export default function ProviderProfilePage(props: ProviderProfilePageProps) {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { data: providerDetails } = useQuery(['provider', id], () =>
    getProviderDetails(Number(id))
  );

  const { mutateAsync } = useMutation(
    ({
      providerId,
      acceptingNewPatients,
    }: {
      providerId: number;
      acceptingNewPatients: boolean;
    }) => toggleAcceptingNewPatients(providerId, acceptingNewPatients)
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => <Logo height={48} width={140} />,
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {user?.userId === Number(id) && (
                <TouchableOpacity
                  style={[
                    {
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 10,
                      padding: 5,
                      backgroundColor: providerDetails?.acceptingNewPatients
                        ? '#805AD5'
                        : '#ccc',
                    },
                  ]}
                  onPress={() => {
                    mutateAsync({
                      providerId: Number(id),
                      acceptingNewPatients:
                        !providerDetails?.acceptingNewPatients,
                    }).then(() =>
                      queryClient.invalidateQueries(['provider', id])
                    );
                  }}
                >
                  <View
                    style={[
                      {
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        transform: [
                          {
                            translateX: providerDetails?.acceptingNewPatients
                              ? 20
                              : 0,
                          },
                        ],
                      },
                    ]}
                  />
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                }}
              >
                {providerDetails?.acceptingNewPatients ? 'Yes' : 'No'}
              </Text>
            </View>
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
    alignItems: 'center',
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
