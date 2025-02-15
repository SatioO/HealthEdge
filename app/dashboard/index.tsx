import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { useQuery } from 'react-query';
import { router, Stack } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';
import { getAppointments } from '@/services/appointment';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { data: appointments } = useQuery(
    ['appointments', user?.userId],
    getAppointments
  );

  // const today = new Date();
  // const todayAppointment = appointments?.find((apt) => {
  //   const aptDate = new Date(apt.slot);
  //   return aptDate.toDateString() === today.toDateString();
  // });

  // const upcomingAppointments = appointments?.filter((apt) => {
  //   const aptDate = new Date(apt.slot);
  //   return aptDate > today;
  // });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.scheduleButtonContainer}>
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={() => router.push('/book/appointment')}
            activeOpacity={0.7}
          >
            <View style={styles.scheduleButtonContent}>
              <View style={styles.scheduleButtonTextContainer}>
                <Text style={styles.scheduleButtonTitle}>
                  Schedule Appointment
                </Text>
                <Text style={styles.scheduleButtonSubtext}>
                  Book your next visit with a healthcare provider
                </Text>
              </View>
              <View style={styles.scheduleButtonIconContainer}>
                <Text style={styles.scheduleButtonIcon}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.upcomingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <Text style={styles.appointmentCount}>
              {appointments?.length || 0} scheduled
            </Text>
          </View>

          {appointments?.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {new Date(appointment.dateTime).toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </Text>
                  <Text style={styles.timeText}>
                    {new Date(appointment.dateTime).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.appointmentDetails}>
                  <View style={styles.providerRow}>
                    <Text style={styles.providerName}>
                      Dr. {appointment.provider.name.givenName}{' '}
                      {appointment.provider.name.familyName}
                    </Text>
                    <Text style={styles.specialtyText}>
                      {appointment.speciality.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {(!appointments || appointments.length === 0) && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
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
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
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
});
