import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { getCategories } from '@/services/categories';
import { getSpecialities } from '@/services/speciality';
import { AppointmentForm } from '@/services/appointment';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'expo-image';

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
      <View style={styles.heroContainer}>
        <Image
          accessible={true}
          accessibilityLabel="Doctor consultation illustration"
          source={{
            uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEwMCA1MEMxMjcuNjE0IDUwIDE1MCA3Mi4zODU4IDE1MCAxMDBDMTUwIDEyNy42MTQgMTI3LjYxNCAxNTAgMTAwIDE1MEM3Mi4zODU4IDE1MCA1MCAxMjcuNjE0IDUwIDEwMEM1MCA3Mi4zODU4IDcyLjM4NTggNTAgMTAwIDUwWiIgZmlsbD0iI0U2RUZGQSIvPgogIDxwYXRoIGQ9Ik0xMTAgODBDMTIxLjA0NiA4MCAxMzAgODguOTU0MyAxMzAgMTAwQzEzMCAxMTEuMDQ2IDEyMS4wNDYgMTIwIDExMCAxMjBDOTguOTU0MyAxMjAgOTAgMTExLjA0NiA5MCAxMDBDOTAgODguOTU0MyA5OC45NTQzIDgwIDExMCA4MFoiIGZpbGw9IiM0Q0FGNTAiLz4KICA8cGF0aCBkPSJNOTAgOTBDMTAxLjA0NiA5MCAxMTAgOTguOTU0MyAxMTAgMTEwQzExMCAxMjEuMDQ2IDEwMS4wNDYgMTMwIDkwIDEzMEM3OC45NTQzIDEzMCA3MCAxMjEuMDQ2IDcwIDExMEM3MCA5OC45NTQzIDc4Ljk1NDMgOTAgOTAgOTBaIiBmaWxsPSIjODFDNzg0Ii8+Cjwvc3ZnPg==',
          }}
          style={{
            width: 200,
            height: 200,
          }}
          contentFit="contain"
        />
        <Text style={styles.title}>Find Your Healthcare Provider</Text>
        <Text style={styles.subtitle}>
          Connect with experienced specialists who can provide the care you
          need. Select your preferred medical category and specialty to get
          started.
        </Text>
      </View>

      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.label}>Select Category</Text>
          <Dropdown
            placeholder="Select one"
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
            placeholder="Select one"
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
  headlineContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dropdownContainer: {
    flex: 1,
    rowGap: 30,
    marginTop: 10,
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
    borderColor: 'green',
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
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    borderColor: 'green',
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
  heroContainer: {
    alignItems: 'center',
  },
});
