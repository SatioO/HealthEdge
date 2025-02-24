import { BASE_URL } from '@/services';
import { getStoredAuthData } from '@/services/auth';

export async function getPatientDetails(patientId: number) {
  try {
    const { accessToken } = (await getStoredAuthData()) || {};
    const response = await fetch(`${BASE_URL}/patients/${patientId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch patient details: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching patient details:', error);
    throw error;
  }
}
