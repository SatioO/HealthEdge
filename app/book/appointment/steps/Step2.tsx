import { AppointmentForm } from '@/app/services/appointment';
import { getProviders } from '@/app/services/provider';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useQuery } from 'react-query';

type Step2Props = {
  data: AppointmentForm;
  onChange: (key: keyof AppointmentForm, value: any) => void;
};

export default function Step2(props: Step2Props) {
  const providers = useQuery({
    queryKey: ['speciality/provider', props.data.specialityId],
    queryFn: () => getProviders(Number(props.data.specialityId)),
  });

  return (
    <View>
      <View style={styles.headlineContainer}>
        <Text style={styles.title}>Book Your Appointment</Text>
        <Text style={styles.subtitle}>
          Find the right provider for your needs.
        </Text>
      </View>
      <View style={styles.doctorcontainer}>
        <Text style={styles.title}>Select a Doctor</Text>
        <ScrollView contentContainerStyle={styles.list}>
          {providers.data?.map((provider) => (
            <TouchableOpacity
              key={provider.userId}
              style={[
                styles.card,
                props.data.providerId === provider.userId &&
                  styles.selectedCard,
              ]}
              onPress={() => props.onChange('providerId', provider.userId)}
            >
              {/* <Image source={doctor.image} style={styles.imgcon}></Image> */}
              <Text style={styles.name}>{provider.fullName}</Text>
              <Text style={styles.speciality}>{provider.speciality}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  headlineContainer: {},
  doctorcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    padding: 30,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
});

function setCurrentStep(arg0: (step: number) => number) {
  throw new Error('Function not implemented.');
}
