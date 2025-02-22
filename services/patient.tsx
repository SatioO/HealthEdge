import { BASE_URL } from '@/services';
import { getStoredAuthData } from '@/services/auth';

export async function getPatientDetails() {
    const auth = await getStoredAuthData();
    const response = await fetch(BASE_URL + `/patients/${auth?.user?.userId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}
