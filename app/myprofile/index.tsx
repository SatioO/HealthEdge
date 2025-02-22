import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { getPatientDetails } from '@/services/patient';

export default function MyDetails() {
    const { userId } = useLocalSearchParams();
    const { data: patient } = useQuery(['patient', userId], getPatientDetails);
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
                <Text style={styles.userid}>
                    {patient?.name.givenName}
                    {patient?.name.familyName}
                </Text>
                <Text></Text>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
    },
    userid:{
        color: 'green',
    },
})