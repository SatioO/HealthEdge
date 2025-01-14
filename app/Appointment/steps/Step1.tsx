import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';

export default function Step1() {
    const [selectedOption, setSelectedOption] = useState<string>(' ');

    const handleChange = (value: string) => {
        setSelectedOption(value);
    };

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
                        selectedValue={selectedOption}
                        onValueChange={(value) => handleChange(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select an Option" value="" />
                        <Picker.Item label="Behaviour" value="Behaviour" />
                        <Picker.Item
                            label="Non-Behaviour"
                            value="Non-Behaviour"
                        />
                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>Select Speciality : </Text>
                    <Picker
                        selectedValue={selectedOption}
                        onValueChange={(value) => handleChange(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select an Option" value="" />
                        <Picker.Item label="Behaviour" value="Behaviour" />
                        <Picker.Item
                            label="Non-Behaviour"
                            value="Non-Behaviour"
                        />
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
