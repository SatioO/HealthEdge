import { AppointmentResponseDTO } from '@/services/appointment';
import { format } from 'date-fns';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Step4({ data }: { data: AppointmentResponseDTO }) {
  return (
    <View>
      <View style={styles.headlineContainer}>
        <Text style={styles.title}>Appointment Confirmation</Text>
        <Text style={styles.subtitle}>
          Your appointment has been successfully scheduled
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Image
            source={{
              uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI4MCIgZmlsbD0iI0U2RUZGQSIvPgogIDxwYXRoIGQ9Ik04NSAxMDBMMTAwIDExNUwxMzUgODAiIHN0cm9rZT0iIzRDQUY1MCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==',
            }}
            style={styles.successIcon}
          />
          <Text style={styles.successText}>Booking Confirmed!</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Healthcare Provider</Text>
            <Text style={styles.value}>
              Dr. {data.provider.name.givenName} {data.provider.name.familyName}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Specialization</Text>
            <Text style={styles.value}>{data.speciality.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Appointment Date & Time</Text>
            <Text style={styles.value}>
              {format(new Date(data.dateTime), 'MMMM d, yyyy')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headlineContainer: {},
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 16,
  },
});
