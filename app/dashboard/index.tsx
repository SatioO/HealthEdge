import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import { useQuery } from 'react-query';
import { router, Stack } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';
import { AppointmentResponseDTO, getAppointments } from '@/services/appointment';
import { Image } from 'expo-image';
import { JwtResponseDTO, logout, UserDTO } from '@/services/auth';
import * as WebBrowser from 'expo-web-browser';       
import ProviderDetails from '../myprofile/provider';

export default function DashboardScreen() {
    const { user } = useAuth();

    const isProvider = user?.roles.includes('provider');
    const { data: appointments } = useQuery(
        ['appointments', user?.userId],
        getAppointments
    );

    const isWithin5Minutes = (appointmentTime: string) => {
        const now = new Date();
        const appointmentDate = new Date(appointmentTime);
        const timeDifference = appointmentDate.getTime() - now.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        return minutesDifference >= 0 && minutesDifference <= 5;
    };

    const today = new Date();
    const upcomingAppointment = appointments?.find((apt) => {
        const aptDate = new Date(apt.dateTime);
        return aptDate.toDateString() === today.toDateString();
    });

    const canJoinAppointment =
        upcomingAppointment && isWithin5Minutes(upcomingAppointment.dateTime);

    async function handleJoin() {
        
        if (isProvider){
            console.log('pending')
        }else{
        // if (!canJoinAppointment) {
        //   if (Platform.OS === 'web') {
        //     alert(
        //       'You can only join the appointment when there are 5 minutes or less remaining until the appointment time.'
        //     );
        //   } else {
        //     Alert.alert(
        //       'Cannot Join Yet',
        //       'You can only join the appointment when there are 5 minutes or less remaining until the appointment time.'
        //     );
        //   }

        //   return;
        // }
        const websiteUrl = "";
        console.log("joined room", websiteUrl);
        if (websiteUrl) {
            await WebBrowser.openBrowserAsync(websiteUrl);
        }
        }

       
    }

    function handleChange(appointment: AppointmentResponseDTO) {
        const provider = appointment.provider;
        router.push({
            pathname: './profile',
            params:{
                id: provider.userId
            }
        });
    }

    function onHandle(){
        if(isProvider){
            const provider = user?.userId;
            router.push({
                pathname: './myprofile/provider',
                params: {
                    id: provider 
                }
            });
        }else{
            const patient = user?.userId;
            router.push({
                pathname: './myprofile/patient',
                params: {
                    userId: patient
                }
            })
        }
    }

    async function logoutUser() {
        await logout();
        router.replace('/login');
    }

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
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                padding: 8,
                                marginRight: 8,
                                borderRadius: 8,
                            }}
                            onPress={onHandle}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                            >
                                MyProfile
                            </Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={logoutUser}
                            style={{
                                padding: 8,
                                marginLeft: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView style={styles.container}>
                {isProvider && (
                    <View style={styles.scheduleButtonContainer}>
                        <TouchableOpacity
                            style={styles.scheduleButton}
                            onPress={handleJoin}
                        >
                            <View>
                                <Text style={styles.scheduleButtonTitle}>
                                    Join Consultation Room
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {!isProvider && (
                    <View style={styles.scheduleButtonContainer}>
                        <TouchableOpacity
                            style={styles.scheduleButton}
                            onPress={() => router.push('/book/appointment')}
                            activeOpacity={0.7}
                        >
                            <View style={styles.scheduleButtonContent}>
                                <View
                                    style={styles.scheduleButtonTextContainer}
                                >
                                    <Text style={styles.scheduleButtonTitle}>
                                        Schedule Appointment
                                    </Text>
                                    <Text style={styles.scheduleButtonSubtext}>
                                        Book your next visit with a healthcare
                                        provider
                                    </Text>
                                </View>
                                <View
                                    style={styles.scheduleButtonIconContainer}
                                >
                                    <Text style={styles.scheduleButtonIcon}>
                                        →
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {upcomingAppointment && (
                    <View style={styles.todayCard}>
                        <Text style={styles.cardTitle}>
                            Upcoming Appointment
                        </Text>
                        {!isProvider && (
                            <Text style={styles.cardText}>
                                Provider: Dr.{' '}
                                {upcomingAppointment.provider.name.givenName}{' '}
                                {upcomingAppointment.provider.name.familyName}
                            </Text>
                        )}
                        {isProvider && (
                            <Text style={styles.cardText}>
                                Patient:{' '}
                                {upcomingAppointment.patient.name.givenName}{' '}
                                {upcomingAppointment.patient.name.familyName}
                            </Text>
                        )}
                        <Text style={styles.cardText}>
                            Time:{' '}
                            {new Date(
                                upcomingAppointment.dateTime
                            ).toLocaleTimeString()}
                        </Text>
                        {!isProvider && (
                            <Text style={styles.cardText}>
                                Specialty: {upcomingAppointment.speciality.name}
                            </Text>
                        )}
                        {!isProvider && (
                            <TouchableOpacity
                                style={styles.joinButton}
                                onPress={handleJoin}
                            >
                                <Text style={styles.joinButtonText}>
                                    Join Appointment
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <View style={styles.upcomingSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            All Appointments
                        </Text>
                        <Text style={styles.appointmentCount}>
                            {appointments?.length || 0} scheduled
                        </Text>
                    </View>

                    {appointments?.slice(0, 5).map((appointment) => (
                        <View
                            key={appointment.id}
                            style={styles.appointmentCard}
                        >
                            <View style={styles.appointmentHeader}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {new Date(
                                            appointment.dateTime
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        {new Date(
                                            appointment.dateTime
                                        ).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.appointmentDetails}>
                                    <TouchableOpacity
                                        style={styles.appointmentDetails}
                                        onPress={() =>
                                            handleChange(appointment)
                                        }
                                    >
                                        <View style={styles.providerRow}>
                                            <Image
                                                source={{
                                                    uri: appointment.provider
                                                        .photoUrl,
                                                }}
                                                style={styles.providerImage}
                                            />
                                            <View style={styles.providerInfo}>
                                                <Text
                                                    style={styles.providerName}
                                                >
                                                    Dr.{' '}
                                                    {
                                                        appointment.provider
                                                            .name.givenName
                                                    }{' '}
                                                    {
                                                        appointment.provider
                                                            .name.familyName
                                                    }
                                                </Text>
                                                <Text
                                                    style={styles.specialtyText}
                                                >
                                                    {
                                                        appointment.speciality
                                                            .name
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    {(!appointments || appointments.length === 0) && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                No upcoming appointments scheduled
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    bookButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    bookButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    todayCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    appointmentCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    joinButton: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    joinButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    scheduleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#616161',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    scheduleButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    scheduleButtonArrow: {
        fontSize: 24,
        color: '#fff',
    },
    scheduleButtonContainer: {
        marginBottom: 8,
    },
    scheduleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scheduleButtonTextContainer: {
        flex: 1,
    },
    scheduleButtonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    scheduleButtonSubtext: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginTop: 4,
    },
    scheduleButtonIconContainer: {
        marginLeft: 16,
    },
    scheduleButtonIcon: {
        fontSize: 24,
        color: '#fff',
    },
    upcomingSection: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    appointmentCount: {
        color: '#666',
        fontSize: 14,
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        width: 80,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ddd',
        marginHorizontal: 16,
    },
    appointmentDetails: {
        flex: 1,
    },
    providerRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    providerName: {
        fontSize: 16,
        fontWeight: '600',
    },
    specialtyText: {
        fontSize: 14,
        color: '#666',
    },
    detailsButton: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    detailsButtonText: {
        color: '#666',
        fontSize: 14,
    },
    emptyState: {
        padding: 24,
        alignItems: 'center',
    },
    emptyStateText: {
        color: '#666',
        fontSize: 16,
    },
    providerImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 12,
    },
    providerInfo: {
        flex: 1,
    },
});
