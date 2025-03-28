import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { useQuery } from 'react-query';
import { router, Stack } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  AppointmentResponseDTO,
  getAppointments,
} from '@/services/appointment';
import { Image } from 'expo-image';
import { logout } from '@/services/auth';
import * as WebBrowser from 'expo-web-browser';
import { getProviderDetails } from '@/services/provider';
import { SvgXml } from 'react-native-svg';

export default function DashboardScreen() {
  const { user } = useAuth();
  const isProvider = user?.roles.includes('provider');

  const { data: appointments } = useQuery(
    ['appointments', user?.userId],
    getAppointments
  );

  const { data: providerDetails } = useQuery(
    ['providers', user?.userId],

    () => getProviderDetails(Number(user?.userId)),
    { enabled: isProvider }
  );

  console.log({ providerDetails });

  const isWithin5Minutes = (appointmentTime: string) => {
    const now = new Date();
    const appointmentDate = new Date(appointmentTime);
    const timeDifference = appointmentDate.getTime() - now.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    return minutesDifference >= 0 && minutesDifference <= 5;
  };

  const today = new Date();
  const upcomingAppointment = [...(appointments ?? [])]
    ?.filter((apt) => new Date(apt.dateTime).getTime() > today.getTime())
    ?.sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    )
    ?.find((apt) => {
      const aptDate = new Date(apt.dateTime);
      return aptDate.toDateString() === today.toDateString();
    });

  const canJoinAppointment =
    upcomingAppointment && isWithin5Minutes(upcomingAppointment.dateTime);

  async function handleJoin() {
    if (isProvider) {
      const websiteUrl = providerDetails?.websiteUrl;
      if (websiteUrl) {
        await WebBrowser.openBrowserAsync(websiteUrl);
      }
    } else {
      if (!canJoinAppointment) {
        if (Platform.OS === 'web') {
          alert(
            'You can only join the appointment when there are 5 minutes or less remaining until the appointment time.'
          );
        } else {
          Alert.alert(
            'Cannot Join Yet',
            'You can only join the appointment when there are 5 minutes or less remaining until the appointment time.'
          );
        }

        return;
      }
      const websiteUrl = upcomingAppointment.provider.websiteUrl;
      if (websiteUrl) {
        await WebBrowser.openBrowserAsync(websiteUrl);
      }
    }
  }

  function onViewProviderProfile(appointment: AppointmentResponseDTO) {
    const provider = appointment.provider;
    router.push({
      pathname: './profile/provider',
      params: {
        id: provider.userId,
      },
    });
  }

  function onViewMyProfile() {
    const userId = user?.userId;

    router.push({
      pathname: `./profile/${isProvider ? 'provider' : 'patient'}`,
      params: {
        id: userId,
      },
    });
  }

  async function logoutUser() {
    await logout();
    router.replace('/login');
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
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
              width={160}
              height={48}
            />
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7FAFC',
                backgroundImage:
                  'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
              }}
            />
          ),
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#F7FAFC',
          },
          headerTintColor: '#1A365D',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 20,
          },
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              <TouchableOpacity
                onPress={onViewMyProfile}
                style={{
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Image
                  source={{
                    uri:
                      isProvider && providerDetails
                        ? providerDetails.photoUrl
                        : 'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: '#805AD5',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logoutUser}
                style={{
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#1A365D', fontSize: 16 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.container}>
        <View
          style={{
            backgroundColor: '#805AD5',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4.65,
            elevation: 8,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={
              isProvider ? handleJoin : () => router.push('/book/appointment')
            }
            activeOpacity={0.7}
          >
            <View style={{ flex: 1, marginRight: 15 }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}
              >
                {isProvider ? 'Join Consultation Room' : 'Schedule Appointment'}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  opacity: 0.9,
                }}
              >
                {isProvider
                  ? 'Ready to provide exceptional care to your patients today?'
                  : 'Your health journey continues here. What can we help you with today?'}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                height: 40,
                width: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#805AD5', fontSize: 20 }}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {upcomingAppointment && (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: '#F0FDF4',
                  padding: 8,
                  borderRadius: 12,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 18 }}>📅</Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#2C5282',
                  letterSpacing: -0.5,
                }}
              >
                Upcoming Appointment
              </Text>
            </View>

            <View style={{ marginLeft: 8 }}>
              {!isProvider && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 14, color: '#64748B', width: 80 }}>
                    Provider:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1A1A1A',
                      fontWeight: '600',
                    }}
                  >
                    Dr. {upcomingAppointment.provider.name.givenName}{' '}
                    {upcomingAppointment.provider.name.familyName}
                  </Text>
                </View>
              )}

              {isProvider && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 14, color: '#64748B', width: 80 }}>
                    Patient:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1A1A1A',
                      fontWeight: '600',
                    }}
                  >
                    {upcomingAppointment.patient.name.givenName}{' '}
                    {upcomingAppointment.patient.name.familyName}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#64748B', width: 80 }}>
                  Time:
                </Text>
                <Text
                  style={{ fontSize: 14, color: '#1A1A1A', fontWeight: '600' }}
                >
                  {new Date(upcomingAppointment.dateTime).toLocaleTimeString()}
                </Text>
              </View>

              {!isProvider && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 14, color: '#64748B', width: 80 }}>
                    Specialty:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1A1A1A',
                      fontWeight: '600',
                    }}
                  >
                    {upcomingAppointment.speciality.name}
                  </Text>
                </View>
              )}
            </View>

            {!isProvider && (
              <TouchableOpacity
                onPress={handleJoin}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 12,
                  backgroundColor: '#805AD5',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: '600',
                    marginRight: 8,
                  }}
                >
                  Join Appointment
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>→</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.upcomingSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: '#2C5282', fontSize: 18, fontWeight: '700' },
              ]}
            >
              All Appointments
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#EBF8FF',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{ color: '#2B6CB0', fontWeight: '600', fontSize: 13 }}
                >
                  {appointments?.length || 0} scheduled
                </Text>
              </View>
            </View>
          </View>

          {appointments?.slice(0).map((appointment) => (
            <View
              key={appointment.id}
              style={[
                styles.appointmentCard,
                {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                },
              ]}
            >
              <View style={styles.appointmentHeader}>
                <View
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor: '#F0F9FF',
                      padding: 10,
                      borderRadius: 8,
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      { color: '#2B6CB0', fontSize: 15, fontWeight: '600' },
                    ]}
                  >
                    {new Date(appointment.dateTime).toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.timeText,
                      { color: '#4A5568', marginTop: 2, fontSize: 12 },
                    ]}
                  >
                    {new Date(appointment.dateTime).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </Text>
                </View>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: '#E2E8F0', width: 1, height: '80%' },
                  ]}
                />
                {!isProvider ? (
                  <View style={[styles.appointmentDetails, { flex: 1 }]}>
                    <TouchableOpacity
                      style={[styles.appointmentDetails, { paddingLeft: 12 }]}
                      onPress={() => onViewProviderProfile(appointment)}
                    >
                      <View style={styles.providerRow}>
                        <Image
                          source={{ uri: appointment.provider.photoUrl }}
                          style={[
                            styles.providerImage,
                            {
                              width: 45,
                              height: 45,
                              borderRadius: 23,
                              marginRight: 10,
                            },
                          ]}
                        />
                        <View style={styles.providerInfo}>
                          <Text
                            style={[
                              styles.providerName,
                              {
                                color: '#2C5282',
                                fontSize: 15,
                                fontWeight: '600',
                                marginBottom: 2,
                              },
                            ]}
                          >
                            Dr. {appointment.provider.name.givenName}{' '}
                            {appointment.provider.name.familyName}
                          </Text>
                          <Text
                            style={[
                              styles.specialtyText,
                              { color: '#4A5568', fontSize: 13 },
                            ]}
                          >
                            {appointment.speciality.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.appointmentDetails, { flex: 1 }]}>
                    <TouchableOpacity
                      style={[styles.appointmentDetails, { paddingLeft: 12 }]}
                    >
                      <View style={styles.providerRow}>
                        <View style={styles.providerInfo}>
                          <Text
                            style={[
                              styles.providerName,
                              {
                                color: '#2C5282',
                                fontSize: 15,
                                fontWeight: '600',
                                marginBottom: 2,
                              },
                            ]}
                          >
                            {appointment.patient.name.givenName}{' '}
                            {appointment.patient.name.familyName}
                          </Text>
                          <Text
                            style={[
                              styles.specialtyText,
                              {
                                color: '#4A5568',
                                fontSize: 13,
                                marginBottom: 1,
                              },
                            ]}
                          >
                            Gender: {appointment.patient.administrativeSex}
                          </Text>
                          <Text
                            style={[
                              styles.specialtyText,
                              { color: '#4A5568', fontSize: 13 },
                            ]}
                          >
                            Email: {appointment.patient.email}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}

          {(!appointments || appointments.length === 0) && (
            <View
              style={[
                styles.emptyState,
                {
                  padding: 24,
                  alignItems: 'center',
                  backgroundColor: '#F7FAFC',
                  borderRadius: 12,
                  marginTop: 12,
                },
              ]}
            >
              <Text
                style={[
                  styles.emptyStateText,
                  {
                    color: '#4A5568',
                    fontSize: 14,
                    textAlign: 'center',
                  },
                ]}
              >
                No upcoming appointments scheduled
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  todayCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  joinButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  joinButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#616161',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  scheduleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  scheduleButtonArrow: {
    fontSize: 24,
    color: '#fff',
  },
  scheduleButtonContainer: {
    marginBottom: 8,
  },
  scheduleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scheduleButtonTextContainer: {
    flex: 1,
  },
  scheduleButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scheduleButtonSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  scheduleButtonIconContainer: {
    marginLeft: 16,
  },
  scheduleButtonIcon: {
    fontSize: 24,
    color: '#fff',
  },
  upcomingSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  appointmentCount: {
    color: '#666',
    fontSize: 14,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    width: 80,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
    marginHorizontal: 16,
  },
  appointmentDetails: {
    flex: 1,
  },
  providerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  detailsButtonText: {
    color: '#666',
    fontSize: 14,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
  },
  providerImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
});
