import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Picker } from '@react-native-picker/picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const loginValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  birthdate: yup
    .date()
    .required('Birthdate is required')
    .typeError('Please enter a valid date'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
    .required('Gender is required'),
});

export default function signUp() {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  function onSubmit() {}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          password: '',
          name: '',
          birthdate: '',
          gender: '',
          phoneNumber: '',
        }}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={{ rowGap: 20 }}>
            <View>
              <View style={styles.inputContainer}>
                <View style={{ width: 32, height: 32 }}>
                  <Icon name="person-outline" size={25} style={styles.icon} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  keyboardType="default"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
            <View>
              <View style={styles.inputContainer}>
                <View style={{ width: 32, height: 32 }}>
                  <Icon name="mail-outline" size={25} style={styles.icon} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View>
              <View style={styles.inputContainer}>
                <View style={{ width: 32, height: 32 }}>
                  <Icon
                    name="lock-closed-outline"
                    size={25}
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setOpenDatePicker(true)}
                style={styles.inputContainer}>
                <Icon name="calendar-outline" size={25} style={styles.icon} />
                <Text style={styles.input}>
                  {values.birthdate || 'Select Birthdate'}
                </Text>
              </TouchableOpacity>
              {openDatePicker && (
                <DateTimePicker
                  value={
                    values.birthdate ? new Date(values.birthdate) : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setOpenDatePicker(false);
                    if (selectedDate) {
                      setFieldValue(
                        'birthdate',
                        selectedDate.toISOString().split('T')[0]
                      );
                    }
                  }}
                />
              )}
              {errors.birthdate && touched.birthdate && (
                <Text style={styles.errorText}>{errors.birthdate}</Text>
              )}
            </View>
            {/* <View>
              <TouchableOpacity
                onPress={() => setOpenDatePicker(true)}
                style={styles.inputContainer}>
                <Icon name="calendar-outline" size={25} style={styles.icon} />
                <Text style={styles.input}>
                  {values.birthdate || 'Select Birthdate'}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                mode="date"
                open={openDatePicker}
                date={
                  values.birthdate ? new Date(values.birthdate) : new Date()
                }
                onConfirm={(date) => {
                  setOpenDatePicker(false);
                  setFieldValue('birthdate', date.toISOString().split('T')[0]);
                }}
                onCancel={() => setOpenDatePicker(false)}
              />
              {errors.birthdate && touched.birthdate && (
                <Text style={styles.errorText}>{errors.birthdate}</Text>
              )}
            </View> */}
            <View>
              <View style={styles.inputContainer}>
                <Icon
                  name="male-female-outline"
                  size={25}
                  style={styles.icon}
                />
                <Picker
                  selectedValue={values.gender}
                  onValueChange={(itemValue) =>
                    setFieldValue('gender', itemValue)
                  }
                  style={styles.input}>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
                {errors.gender && touched.gender && (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                )}
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <Icon name="call-outline" size={25} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.logIn}>
                  Already have an account?
                  <Text style={styles.logInLink}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 10,
    color: '#64748b',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    // outline: 'none',
    outlineColor: 'transparent',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
  },
  buttonDisabled: {
    backgroundColor: '#a9d7ff',
  },
  logIn: {
    marginTop: 15,
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  logInLink: {
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
