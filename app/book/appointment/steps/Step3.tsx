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

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate;
    setSelectedDate(currentDate as Date);
  };

  return (
    <View>
      <View style={styles.headlineContainer}>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.title}>Select Date</Text>
        <RNDateTimePicker
          themeVariant="light"
          value={selectedDate}
          mode={'date'}
          onChange={handleDateChange}
        />
      </View>
      <View style={styles.timeSlotContainer}>
        <Text style={styles.title}>Select Time Slot</Text>
        <FlatList
          data={availableSlots.data}
          keyExtractor={(item) => item.startDateTime}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                props.data.slot === item.startDateTime &&
                  styles.selectedTimeSlot,
              ]}
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
          )}
        />
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
  dateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    backgroundColor: '#085578',
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
});
