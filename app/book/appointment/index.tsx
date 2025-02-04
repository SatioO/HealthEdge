import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { AppointmentForm } from '@/app/services/appointment';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [values, setValues] = useState<AppointmentForm>({
    category: '',
    speciality: '',
  });

  function handleNext() {
    if (currentStep < 4) {
      setCurrentStep((step) => step + 1);
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
        {currentStep === 2 && <Step2 navigation={undefined} />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && (
          <Step4 route={undefined} navigation={undefined} />
        )}
        {currentStep > 1 && currentStep !== 4 && (
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCurrentStep((prev) => prev - 1)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep < 3 && (
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 3 && (
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  headlineContainer: {},
  mainContent: {
    flex: 1,
    rowGap: 30,
    backgroundColor: '#f5f5f5',
    padding: 30,
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
  buttoncontainer: {
    flexDirection: 'row',
    borderRadius: 50,
    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '25%',
  },
  button: {
    width: '48%',
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
