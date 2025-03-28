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
import { SvgXml } from 'react-native-svg';

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
      <View style={{ flex: 1, backgroundColor: 'rgba(128, 90, 213, 0.9)' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: 24,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 24,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                  <SvgXml
                    xml={`<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" fill="none">
                      <text x="10" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1A365D">
                        Reach 
                      </text>
                      <text x="80" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#805AD5">
                        Specialist
                      </text>
                      <path d="M50 20 L65 5 L80 20" stroke="#1A365D" stroke-width="4" fill="none"/>
                      <circle cx="65" cy="5" r="3" fill="#805AD5"/>
                    </svg>`}
                    width={240}
                    height={56}
                  />

                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#718096',
                        textAlign: 'center',
                      }}
                    >
                      Access your personalized healthcare experience
                    </Text>
                  </View>
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#4A5568',
                      marginBottom: 8,
                    }}
                  >
                    Email Address
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={{
                          height: 48,
                          borderWidth: 1,
                          borderColor: errors.email ? '#F56565' : '#E2E8F0',
                          borderRadius: 8,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          backgroundColor: '#F7FAFC',
                        }}
                        placeholder="Enter your email"
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
                    <Text
                      style={{ color: '#F56565', fontSize: 12, marginTop: 4 }}
                    >
                      {errors.email.message}
                    </Text>
                  )}
                </View>

                <View style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#4A5568',
                      marginBottom: 8,
                    }}
                  >
                    Password
                  </Text>
                  <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={{
                          height: 48,
                          borderWidth: 1,
                          borderColor: errors.password ? '#F56565' : '#E2E8F0',
                          borderRadius: 8,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          backgroundColor: '#F7FAFC',
                        }}
                        placeholder="Enter your password"
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
                    <Text
                      style={{ color: '#F56565', fontSize: 12, marginTop: 4 }}
                    >
                      {errors.password.message}
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
                  <Text
                    style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 16,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }}
                  />
                  <Text style={{ marginHorizontal: 8, color: '#718096' }}>
                    or
                  </Text>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Text style={{ color: '#718096' }}>
                    New to ReachSpecialist?
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={{ color: '#805AD5', fontWeight: '600' }}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 24, alignItems: 'center' }}>
                  <Text style={{ color: '#718096', fontSize: 12 }}>
                    🔒 HIPAA Compliant & Secure Platform
                  </Text>
                </View>
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
