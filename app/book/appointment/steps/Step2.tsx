import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// 
export default function Step2({navigation}:{navigation:any}) {
 const { category, speiality } = route.params;
 const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

const {data: doctors, isLoading, error} = useQuery(
    ['providers', category, speciality],
    () =< getProviders(category, speciality),
    {enabled: !!category && !!speciality}
);

 const handleDoctorSelect = (doctor: { id: string; name: string; speciality: string; image: any; }) =>{
    setSelectedDoctor(doctor);
 };

const handleNextStep = () => {
    if (selectedDoctor){
        navigation.navigate('FinalStep',{doctor: selectedDoctor});
    }else{
        alert('Please select a doctor before proceeding');
    }
};

if(isLoading){
    return <Text>Loading Providers...</Text>
}

if (error){
    return <Text>Failed to load providers. Please try again later</Text>
}

    return (
        <View>
            <View style={styles.headlineContainer}>
                <Text style={styles.title}>Book Your Appointment</Text>
                <Text style={styles.subtitle}>
                    Find the right provider for your needs.
                </Text>
            </View>
            <View style={styles.doctorcontainer}>
                <Text style={styles.title}>Select a Doctor</Text>
                <ScrollView contentContainerStyle={styles.list}>
                    {doctors.map((doctor: any)=>(
                        <TouchableOpacity
                            key={doctor.id}
                            style={[styles.card,
                                selectedDoctor?.id === doctor.id && styles.selectedCard,
                            ]}
                            onPress={()=> handleDoctorSelect(doctor)}
                            >
                                <Image source={doctor.image} style={styles.imgcon}></Image>
                                <Text style={styles.name}>{doctor.name}</Text>
                                <Text style={styles.speciality}>{doctor.speciality}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
    doctorcontainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        padding: 30,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#798599',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: '40%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    imgcon: {
        width: 80,
        height: 100,
        borderRadius: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 200,
        textAlign: 'center',
    },
    speciality: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
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
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    selectedCard:{
        borderWidth: 2,
        borderColor: '#4caf50',
    },
});

function setCurrentStep(arg0: (step: number) => number) {
    throw new Error('Function not implemented.');
}
