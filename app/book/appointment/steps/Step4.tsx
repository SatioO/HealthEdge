import { View, Text, StyleSheet } from "react-native";

export default function Step4({route, navigation}:{route : any, navigation: any}){
     const doctor = route?.params?.doctor || {
         name: 'Unknown',
         speciality: 'N/A',
     };
     const selectedDate = route?.params?.selectedDate || 'Unknown Date';
     const selectedSlot = route?.params?.selectedSlot || 'Unknown Time Slot';
    return (
        <View>
            <View style={styles.headlineContainer}>
                <Text style={styles.title}>Appointment Details</Text>
                <Text style={styles.subtitle}>
                    Find the right provider for your needs.
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Your Appointment has been booked successfully
                </Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}>Doctor:</Text>
                    <Text style={styles.value}>{doctor.name}</Text>
                    <Text style={styles.label}>Speciality:</Text>
                    <Text style={styles.value}>
                        {doctor.speciality}
                    </Text>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>
                        {selectedDate.toString()}
                    </Text>
                    <Text style={styles.label}>Time Slot:</Text>
                    <Text style={styles.value}>
                        {selectedSlot}
                    </Text>
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
    headlineContainer:{

    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    container:{
        flex:1,
        backgroundColor: '#fff',
        padding: 20,
    },
    detailContainer: {
        backgroundColor: "#fff",
        padding : 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label:{
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    value:{
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
    },
});