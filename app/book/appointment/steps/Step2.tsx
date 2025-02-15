import { AppointmentForm } from '@/services/appointment';
import { getProviders } from '@/services/provider';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from 'react-query';
import { Image } from 'expo-image';

type Step2Props = {
  data: AppointmentForm;
  onChange: (key: keyof AppointmentForm, value: any) => void;
};

export default function Step2(props: Step2Props) {
  const providers = useQuery({
    queryKey: ['speciality/provider', props.data.specialityId],
    queryFn: () => getProviders(Number(props.data.specialityId)),
  });

  if (providers.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (providers.error) {
    return <Text>Error loading providers</Text>;
  }

  if (!providers.data || providers.data.length === 0) {
    return (
      <View style={styles.noProvidersContainer}>
        <Image
          source={require('@/assets/images/no-doctor.svg')}
          style={{
            width: 100,
            height: 100,
            marginBottom: 8,
          }}
          contentFit="contain"
        />
        <Text style={styles.noProvidersTitle}>No Doctors Available</Text>
        <Text style={styles.noProvidersMessage}>
          We currently don't have any healthcare providers available for this
          specialty. Please try selecting a different specialty or check back
          later.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headlineContainer}>
        <Text style={styles.title}>Select a Doctor</Text>
        <Text style={styles.subtitle}>
          Choose your preferred healthcare provider
        </Text>
      </View>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        <View style={styles.row}>
          {providers.data.map((provider) => (
            <View style={styles.column} key={provider.userId}>
              <TouchableOpacity
                style={[
                  styles.card,
                  props.data.providerId === provider.userId &&
                    styles.selectedCard,
                ]}
                onPress={() => props.onChange('providerId', provider.userId)}
              >
                <Image
                  source={{
                    uri: provider.photoUrl,
                  }}
                  style={styles.imgcon}
                />
                <View style={styles.providerInfo}>
                  <Text style={styles.name}>
                    Dr. {provider.name.givenName} {provider.name.familyName}
                  </Text>
                  <Text style={styles.speciality}>{provider.speciality}</Text>
                  {provider.bio && (
                    <Text style={styles.description} numberOfLines={4}>
                      {provider.bio}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headlineContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imgcon: {
    width: 80,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
  },
  speciality: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  providerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  gridContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  column: {
    flex: 1,
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  noProvidersContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProvidersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noProvidersMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function setCurrentStep(arg0: (step: number) => number) {
  throw new Error('Function not implemented.');
}
