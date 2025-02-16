import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AppointmentForm } from '@/services/appointment';
import { getAvailableSlots } from '@/services/provider';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type Step3Props = {
  data: AppointmentForm;
  onChange: (key: keyof AppointmentForm, value: any) => void;
};

export default function Step3(props: Step3Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const availableSlots = useQuery(
    ['providers', props.data.providerId, 'slots', selectedDate],
    () =>
      getAvailableSlots(
        props.data.providerId,
        formatInTimeZone(selectedDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      )
  );

  const handleDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setSelectedDate(currentDate as Date);
  };

  return (
    <View>
      <View style={styles.headlineContainer}>
        <Text style={styles.title}>Schedule Your Appointment</Text>
        <Text style={styles.subtitle}>Choose your preferred date and time</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.dateContainer}>
          <RNDateTimePicker
            themeVariant="light"
            value={selectedDate}
            mode={'date'}
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        </View>

        <View style={styles.timeSlotContainer}>
          <Text style={styles.sectionTitle}>Select Time Slot</Text>
          <View style={styles.timeSlotListContainer}>
            <FlatList
              data={availableSlots.data}
              keyExtractor={(item) => item.startDateTime}
              numColumns={3}
              contentContainerStyle={styles.timeSlotList}
              renderItem={({ item }) => (
                <View style={styles.timeSlotColumn}>
                  <TouchableOpacity
                    style={[
                      styles.timeSlot,
                      props.data.slot === item.startDateTime &&
                        styles.selectedTimeSlot,
                      !item.available && styles.disabledTimeSlot,
                    ]}
                    disabled={!item.available}
                    onPress={() => props.onChange('slot', item.startDateTime)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        props.data.slot === item.startDateTime &&
                          styles.selectedTimeSlotText,
                      ]}
                    >
                      {format(item.startDateTime, 'HH:mm a')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
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
    color: '#555',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '20%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  dateOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#333',
  },
  disabledTimeSlot: {
    backgroundColor: '#DDDDDD',
    color: '#FFF',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0855758',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  timeSlotContainer: {
    marginTop: 20,
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
    borderColor: '#085578',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeSlotColumn: {
    flex: 1,
    padding: 4,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePicker: {
    height: 120,
    marginTop: 10,
  },
  timeSlotList: {
    paddingHorizontal: 8,
  },
  timeSlotListContainer: {
    flex: 1,
  },
});
