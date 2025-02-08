import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { emailValidation, passwordValidation } from '@/utils/validationRules';
import { Image } from 'expo-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import { wrap } from 'module';

const BACKGROUND_IMAGE =
  'https://cdn.pixabay.com/photo/2021/10/11/17/37/doctor-6701410_1280.jpg';

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
      birthdate: new Date().toISOString().split('T')[0],
      gender: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form Data: ', data.firstName, data.middleName, data.lastName);
  };

  const phoneValidation = {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Phone number ,ust be 10 digits',
    },
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: BACKGROUND_IMAGE }}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Patient Signup</Text>

              <View style={styles.nameContainer}>
                <View style={styles.nameInputWrapper}>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: 'Name is required' }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.nameInput,
                          errors.firstName && styles.inputError,
                        ]}
                        placeholder="First Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
                {errors.firstName && (
                  <Text style={styles.nerrorText}>
                    {errors.firstName.message}
                  </Text>
                )}
                <View style={styles.nameInputWrapper}>
                  <Controller
                    control={control}
                    name="middleName"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.nameInput,
                          errors.middleName && styles.inputError,
                        ]}
                        placeholder="Middle Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.middleName && (
                    <Text style={styles.nerrorText}>
                      {errors.middleName.message}
                    </Text>
                  )}
                </View>
                <View style={styles.nameInputWrapper}>
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{
                      required: 'Name is required',
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={[
                          styles.nameInput,
                          errors.lastName && styles.inputError,
                        ]}
                        placeholder="Last Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <Text style={styles.nerrorText}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="gender"
                  rules={{ required: 'Gender is required' }}
                  render={({ field: { onChange, value } }) => (
                    <></>
                    // <Picker
                    //     selectedValue={value}
                    //     onValueChange={onChange}
                    //     style={styles.picker}
                    // >
                    //     <Picker.Item
                    //         label="Select Gender"
                    //         value=""
                    //     />
                    //     <Picker.Item
                    //         label="Male"
                    //         value="male"
                    //     />
                    //     <Picker.Item
                    //         label="Female"
                    //         value="female"
                    //     />
                    //     <Picker.Item
                    //         label="Other"
                    //         value="other"
                    //     />
                    // </Picker>
                  )}
                />
                {errors.gender && (
                  <Text style={styles.errorText}>{errors.gender.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="birthdate"
                  rules={{
                    required: 'Birthdate is required',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      style={styles.datePicker}
                      value={new Date(value)}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        onChange(
                          selectedDate
                            ? selectedDate.toISOString().split('T')[0]
                            : value
                        );
                      }}
                    />
                  )}
                />
                {errors.birthdate && (
                  <Text style={styles.errorText}>
                    {errors.birthdate.message}
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
                      placeholder="Phone Number"
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
                  name="email"
                  rules={emailValidation}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      placeholder="Email"
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
                      placeholder="Password"
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

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              <Text style={styles.privacyText}>
                Secure & HIPAA Compliant Platform
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    columnGap: 10,
    flexWrap: 'wrap',
    rowGap: 5,
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
});

export default SignupScreen;
