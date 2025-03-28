import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, Stack } from 'expo-router';
import {
  AppointmentForm,
  AppointmentResponseDTO,
  createAppointment,
} from '@/services/appointment';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import { formatInTimeZone } from 'date-fns-tz';
import Logo from '@/assets/logo/logo';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [values, setValues] = useState<AppointmentForm>({
    category: '',
    specialityId: 0,
    providerId: 0,
    slot: '',
  });
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentResponseDTO | null>(null);

  async function handleNext() {
    if (currentStep === 1 && values.specialityId) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (currentStep === 2 && values.providerId) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (currentStep === 3 && values.slot) {
      try {
        const response = await createAppointment({
          dateTime: formatInTimeZone(
            new Date(values.slot),
            'UTC',
            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
          ),
          providerId: values.providerId,
          specialityId: values.specialityId,
        });
        setAppointmentDetails(response);
        setCurrentStep(currentStep + 1);
        return;
      } catch (err) {}
    }
  }

  function handleChange(key: keyof AppointmentForm, value: any) {
    setValues({ ...values, [key]: value });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => <Logo height={48} width={140} />,
          headerStyle: {
            backgroundColor: '#F7FAFC',
          },
          headerTintColor: '#1A365D',
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 20,
          },
        }}
      />
      <View style={styles.mainContent}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ScrollView>
              {currentStep === 1 && (
                <Step1 data={values} onChange={handleChange} />
              )}
              {currentStep === 2 && (
                <Step2 data={values} onChange={handleChange} />
              )}
              {currentStep === 3 && (
                <Step3 data={values} onChange={handleChange} />
              )}
              {currentStep === 4 && appointmentDetails && (
                <Step4 data={appointmentDetails} />
              )}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            {currentStep > 1 && currentStep !== 4 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#805AD5',
                  height: 48,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 24,
                }}
                onPress={() => setCurrentStep((prev) => prev - 1)}
              >
                <Text
                  style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            )}
            {currentStep < 3 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#805AD5',
                  height: 48,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 24,
                }}
                onPress={handleNext}
              >
                <Text
                  style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            )}
            {currentStep === 3 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#805AD5',
                  height: 48,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 24,
                }}
                onPress={handleNext}
              >
                <Text
                  style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}
                >
                  Book
                </Text>
              </TouchableOpacity>
            )}
            {currentStep === 4 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#805AD5',
                  height: 48,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 24,
                }}
                onPress={() => router.replace('/dashboard')}
              >
                <Text
                  style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}
                >
                  Go Home
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navbar: {
    height: 60,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headlineContainer: {},

  dropdownContainer: {
    flex: 1,
    rowGap: 30,
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
  dropDownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selection: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
