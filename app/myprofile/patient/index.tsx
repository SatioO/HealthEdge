import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';
import { getPatientDetails } from '@/services/patient';

export default function MyDetails() {
    const { userId } = useLocalSearchParams();
    const { data: patient } = useQuery(['patient', userId], getPatientDetails);
    console.log(patient)
    return (
        <>
            <Stack.Screen
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: '#4CAF50',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: '500',
                        fontSize: 16,
                    },
                    headerShadowVisible: false,
                }}
            ></Stack.Screen>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}> Name : {patient?.name.givenName}{''}{patient?.name?.familyName}</Text>
                    <Text style={styles.cardInfo}>Username : {patient?.username}</Text>
                </View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 50,
    },
    container: {
        backgroundColor: '#ffffff',
    },
    cardTitle: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
    },
    photo: {
        height: 100,
        width: 100,
    },
    cardInfo: {
        textAlign: 'center',
    },
});