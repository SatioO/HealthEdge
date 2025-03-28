import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { emailValidation, passwordValidation } from '@/utils/validationRules';
import { Dropdown } from 'react-native-element-dropdown';
import { signup } from '@/services/auth';
import { router, Stack } from 'expo-router';
import Logo from '@/assets/logo/logo';

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      phoneNumber: '',
      maritalStatus: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await signup({
        name: {
          givenName: data.firstName,
          middleName: data.middleName,
          familyName: data.lastName,
        },
        password: data.password,
        email: data.email,
        administrativeSex: data.gender,
        maritalStatus: data.maritalStatus,
      });
      if (Platform.OS === 'web') {
        alert(
          'Your account has been created successfully. Please proceed to login.'
        );
        router.replace('/login');
      } else {
        Alert.alert(
          'Success!',
          'Your account has been created successfully. Please proceed to login.',
          [
            {
              text: 'OK',
              onPress: () => {
                router.replace('/login');
              },
            },
          ]
        );
      }
    } catch (err) {
      if (Platform.OS === 'web') {
        alert('There was an error creating your account. Please try again.');
      } else {
        Alert.alert(
          'Signup Failed',
          'There was an error creating your account. Please try again.',
          [
            {
              text: 'OK',
            },
          ]
        );
      }
    }
  };

  const phoneValidation = {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Phone number must be 10 digits',
    },
  };

  const RenderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>List Empty!</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContent}>
      <View style={{ flex: 1, backgroundColor: 'rgba(128, 90, 213, 0.9)' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Logo height={60} width={180} />
                <Text style={styles.mainTitle}>
                  Begin Your Healthcare Journey
                </Text>
                <Text style={styles.description}>
                  Access top healthcare providers, schedule appointments
                  seamlessly, and manage your medical journey - all from one
                  secure platform.
                </Text>
              </View>

              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.formContainer}
              >
                <View style={styles.nameContainer}>
                  <View style={[styles.nameInputWrapper, { flex: 2 }]}>
                    <Controller
                      control={control}
                      name="firstName"
                      rules={{ required: 'First name is required' }}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                          style={[
                            styles.nameInput,
                            errors.firstName && styles.inputError,
                          ]}
                          placeholder="First Name"
                          placeholderTextColor="#666"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <Text style={styles.errorText}>
                        {errors.firstName.message}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.nameInputWrapper, { flex: 1 }]}>
                    <Controller
                      control={control}
                      name="middleName"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                          style={[
                            styles.nameInput,
                            errors.middleName && styles.inputError,
                          ]}
                          placeholder="MI"
                          placeholderTextColor="#666"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          maxLength={1}
                        />
                      )}
                    />
                    {errors.middleName && (
                      <Text style={styles.errorText}>
                        {errors.middleName.message}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.nameInputWrapper, { flex: 2 }]}>
                    <Controller
                      control={control}
                      name="lastName"
                      rules={{ required: 'Last name is required' }}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                          style={[
                            styles.nameInput,
                            errors.lastName && styles.inputError,
                          ]}
                          placeholder="Last Name"
                          placeholderTextColor="#666"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <Text style={styles.errorText}>
                        {errors.lastName.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.email && styles.inputError,
                        ]}
                        placeholder="Email Address"
                        placeholderTextColor="#666"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.password && styles.inputError,
                        ]}
                        placeholder="Create Password"
                        placeholderTextColor="#666"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    )}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={phoneValidation}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.phoneNumber && styles.inputError,
                        ]}
                        placeholder="Phone Number (10 digits)"
                        placeholderTextColor="#666"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="phone-pad"
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <Text style={styles.errorText}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="gender"
                    rules={{ required: 'Please select your gender' }}
                    render={({ field: { onChange, value } }) => (
                      <Dropdown
                        style={styles.dropdown}
                        placeholder="Select Gender"
                        // placeholderStyle={styles.dropdownPlaceholder}
                        value={value}
                        data={[
                          { label: 'Male', value: 'M' },
                          { label: 'Female', value: 'F' },
                        ]}
                        onChange={(item) => onChange(item.value)}
                        labelField={'label'}
                        valueField={'value'}
                        flatListProps={{
                          ListEmptyComponent: <RenderEmpty />,
                        }}
                      />
                    )}
                  />
                  {errors.gender && (
                    <Text style={styles.errorText}>
                      {errors.gender.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="maritalStatus"
                    rules={{ required: 'Please select your marital status' }}
                    render={({ field: { onChange, value } }) => (
                      <Dropdown
                        style={styles.dropdown}
                        placeholder="Select Marital Status"
                        // placeholderStyle={styles.dropdownPlaceholder}
                        value={value}
                        data={[
                          { label: 'Single', value: 'S' },
                          { label: 'Married', value: 'M' },
                          { label: 'Divorced', value: 'D' },
                          { label: 'Widowed/Separated', value: 'W' },
                        ]}
                        onChange={(item) => onChange(item.value)}
                        labelField={'label'}
                        valueField={'value'}
                        flatListProps={{
                          ListEmptyComponent: <RenderEmpty />,
                        }}
                      />
                    )}
                  />
                  {errors.maritalStatus && (
                    <Text style={styles.errorText}>
                      {errors.maritalStatus.message}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#805AD5',
                    height: 48,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Already registered?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={{ color: '#805AD5', fontWeight: '600' }}>
                    Login here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    gap: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    columnGap: 8,
  },

  inputContainer: {},
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  nameInputWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },

  nameInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
  },

  inputError: {
    borderColor: '#ff0000',
  },
  nerrorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    textAlign: 'left',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyText: {
    color: '#7f8c8d',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  datePicker: {
    width: '100%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default SignupScreen;
