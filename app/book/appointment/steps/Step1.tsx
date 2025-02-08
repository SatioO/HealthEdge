import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { getCategories } from '@/app/services/categories';
import { getSpecialities } from '@/app/services/speciality';
import { AppointmentForm } from '@/app/services/appointment';

type Step1Props = {
    data: AppointmentForm;
    onChange: (key: keyof AppointmentForm, value: any) => void;
};

export default function StepOne({ onChange, data }: Step1Props) {
    const categories = useQuery({
        queryKey: ['speciality/category'],
        queryFn: getCategories,
    });

    const specialities = useQuery({
        queryKey: ['speciality', data.category],
        queryFn: () => getSpecialities(data.category),
        enabled: !!data.category,
    });

    function handleCategoryChange(value: string) {
        onChange('category', value);
    }

    function handleSpecialityChange(value: string) {
        onChange('speciality', String(value));
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
                    <Text style={styles.label}>Select Category : </Text>
                    <Picker
                        selectedValue={data.category}
                        onValueChange={handleCategoryChange}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select an Option" value="" />
                        {categories.data?.map((category) => (
                            <Picker.Item
                                key={category.name}
                                label={category.name}
                                value={category.name}
                            />
                        ))}
                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>Select Speciality : </Text>
                    <Picker
                        selectedValue={data.speciality}
                        onValueChange={handleSpecialityChange}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select an Option" value="" />
                        {specialities.data?.map((speciality) => (
                            <Picker.Item
                                key={speciality.name}
                                label={speciality.name}
                                value={speciality.id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
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
    buttoncontainer: {
        borderRadius: 50,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
});

function setCurrentStep(arg0: (step: number) => number) {
    throw new Error('Function not implemented.');
}
