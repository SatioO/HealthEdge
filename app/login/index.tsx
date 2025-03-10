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
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { emailValidation, passwordValidation } from '@/utils/validationRules';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';

const BACKGROUND_IMAGE =
  'https://cdn.pixabay.com/photo/2021/10/11/17/37/doctor-6701410_1280.jpg';

const SignInScreen = () => {
  const auth = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async () => {
    try {
      const values = control._formValues;
      await auth.login(values.email, values.password);
      router.push('/dashboard');
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Invalid credentials. Please try again.');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
      control._reset({
        email: '',
        password: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={BACKGROUND_IMAGE}
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
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Welcome to ReachSpecialist</Text>
                <Text style={styles.subtitle}>
                  Your Online Healthcare Partner
                </Text>
                <Text style={styles.description}>
                  Sign in to access your personalized healthcare dashboard,
                  manage appointments, and connect with your healthcare
                  providers.
                </Text>
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
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>

              <Text style={styles.privacyText}>
                Secure & HIPAA Compliant Platform
              </Text>
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
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
    marginTop: 24,
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
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
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
});

export default SignInScreen;
