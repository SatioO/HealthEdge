import { Text, ScrollView, StyleSheet, Image, View} from 'react-native';
import { useQuery } from 'react-query';
import { getProviderDetails } from '@/services/provider';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';

export default function ProviderDetails() {
    const {id} = useLocalSearchParams();
    const {data: provider} = useQuery(['provider', id], ()=> getProviderDetails(Number(id)))
    return(
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
                        <Image source={{uri: provider?.photoUrl}} style={styles.photo}></Image>
                            <Text style={styles.cardTitle}>
                                {provider?.name.givenName}{' '}
                                {provider?.name.familyName}
                            </Text>
                            <Text style={styles.cardInfo}>{provider?.bio}</Text>
                        </View>
                    </ScrollView>
                </>
    )
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