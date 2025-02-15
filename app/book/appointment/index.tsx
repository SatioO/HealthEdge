import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppointmentForm } from '@/services/appointment';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [values, setValues] = useState<AppointmentForm>({
    category: '',
    specialityId: 0,
    providerId: 0,
    slot: '',
  });

  function handleNext() {
    if (currentStep === 1 && values.specialityId) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (currentStep === 2 && values.providerId) {
      setCurrentStep(currentStep + 1);
      return;
    }
  }

  function handleChange(key: keyof AppointmentForm, value: any) {
    setValues({ ...values, [key]: value });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
      }}
    >
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}></TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContent}>
        {currentStep === 1 && <Step1 data={values} onChange={handleChange} />}
        {currentStep === 2 && <Step2 data={values} onChange={handleChange} />}
        {currentStep === 3 && <Step3 data={values} onChange={handleChange} />}
        {currentStep === 4 && (
          <Step4 route={undefined} navigation={undefined} />
        )}
        <View style={styles.buttonWrapper}>
        {currentStep > 1 && currentStep !== 4 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCurrentStep((prev) => prev - 1)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
    
        )}
        {currentStep < 3 && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
              disabled={!values.specialityId}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        )}
        {currentStep === 3 && (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
        )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headlineContainer: {},
  mainContent: {
    flex: 1,
    rowGap: 30,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  dropdownContainer: {
    flex: 1,
    rowGap: 30,
  },
  navbar: {
    flexDirection: 'row',
    padding: 30,
    backgroundColor: '#085578',
  },
  navItem: {},
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
  buttonWrapper: {
    position: 'absolute',
    bottom: -350,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: "#4caf50",
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
