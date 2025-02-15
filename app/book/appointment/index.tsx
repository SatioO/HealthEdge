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
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                padding: 8,
                marginLeft: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}
              >
                Back
              </Text>
            </TouchableOpacity>
          ),
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
                style={styles.button}
                onPress={() => setCurrentStep((prev) => prev - 1)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            {currentStep < 3 && (
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
            {currentStep === 3 && (
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Book</Text>
              </TouchableOpacity>
            )}
            {currentStep === 4 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/dashboard')}
              >
                <Text style={styles.buttonText}>Go Home</Text>
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
