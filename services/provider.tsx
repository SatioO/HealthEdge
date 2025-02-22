import { BASE_URL } from '@/services';
import { getStoredAuthData } from '@/services/auth';

type ProviderName = {
    givenName: string;
    familyName: string;
    middleName: string;
};

export type Provider = {
    fullName: string;
    name: ProviderName;
    speciality: string;
    userId: number;
    username: string;
    bio?: string;
    photoUrl?: string;
    websiteUrl?: string;
};

export type AvailableSlot = {
    startDateTime: string;
    endDateTime: string;
    available: boolean;
};

export async function getProviders(specialityId: number): Promise<Provider[]> {
    const response = await fetch(
        BASE_URL + '/specialities/' + specialityId + '/providers'
    );
    const data = await response.json();

    return data;
}

export async function getAvailableSlots(
    providerId: number,
    date: string
): Promise<AvailableSlot[]> {
    const response = await fetch(
        BASE_URL + `/providers/${providerId}/slots?date=${date}`
    );
    const data = await response.json();

    return data;
}

export async function getProviderDetails(providerId: number) {
    const auth = await getStoredAuthData();

    const response = await fetch(BASE_URL + `/providers/${providerId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth?.accessToken,
        },
    });
    const data = await response.json();

    return data;
}
