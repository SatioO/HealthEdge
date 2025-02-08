import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { getCategories } from '@/services/categories';
import { getSpecialities } from '@/services/speciality';
import { AppointmentForm } from '@/services/appointment';
import { Dropdown } from 'react-native-element-dropdown';

type Step1Props = {
  data: AppointmentForm;
  onChange: (key: keyof AppointmentForm, value: any) => void;
};

const RenderEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>List Empty!</Text>
    </View>
  );
};

export default function StepOne({ onChange, data }: Step1Props) {
  const categories = useQuery({
    queryKey: ['speciality/category'],
    queryFn: getCategories,
    initialData: [],
  });

  const specialities = useQuery({
    queryKey: ['speciality', data.category],
    queryFn: () => getSpecialities(data.category),
    enabled: !!data.category,
    initialData: [],
  });

  function handleCategoryChange(e: { name: string }) {
    onChange('category', e.name);
  }

  function handleSpecialityChange(e: { id: string }) {
    onChange('specialityId', Number(e.id));
  }

  return (
    <View>
      <View style={styles.headlineContainer}>
        <Text style={styles.title}>Book Your Appointment</Text>
        <Text style={styles.subtitle}>
          Find the right provider for your needs.
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.label}>Select Category</Text>
          <Dropdown
            containerStyle={styles.container}
            style={styles.dropdown}
            value={data.category}
            data={categories.data ?? []}
            onChange={handleCategoryChange}
            labelField={'name'}
            valueField={'name'}
            flatListProps={{
              ListEmptyComponent: <RenderEmpty />,
            }}
          />
        </View>

        <View>
          <Text style={styles.label}>Select Speciality</Text>
          <Dropdown
            containerStyle={styles.container}
            style={styles.dropdown}
            value={data.specialityId}
            data={specialities.data ?? []}
            onChange={handleSpecialityChange}
            labelField={'name'}
            valueField={'id'}
            flatListProps={{
              ListEmptyComponent: <RenderEmpty />,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  headlineContainer: {},
  mainContent: {
    flex: 1,
    rowGap: 30,
    backgroundColor: '#f5f5f5',
    padding: 30,
  },
  dropdownContainer: {
    flex: 1,
    rowGap: 30,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  dropDownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selection: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

function setCurrentStep(arg0: (step: number) => number) {
  throw new Error('Function not implemented.');
}
