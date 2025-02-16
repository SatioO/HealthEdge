import { BASE_URL } from '.';
import { getStoredAuthData, JwtResponseDTO, JwtUserResponseDTO } from './auth';
import { Provider } from './provider';

export type AppointmentForm = {
  category: string;
  specialityId: number;
  providerId: number;
  slot: string;
};

export type CreateAppointmentOpenRequestDTO = {
  dateTime: string;
  specialityId: number;
  providerId: number;
  patientId?: number;
};

export type SpecialityDTO = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export type AppointmentResponseDTO = {
  id: number;
  dateTime: string; // ZonedDateTime represented as ISO string
  speciality: SpecialityDTO;
  provider: Provider;
};

const createAppointment = async (
  params: CreateAppointmentOpenRequestDTO
): Promise<AppointmentResponseDTO> => {
  try {
    const auth = await getStoredAuthData();
    params.patientId = auth?.user.userId;
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth?.accessToken,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Appointment booking failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during appointment booking:', error);
    throw error;
  }
};

export const getAppointments = async (): Promise<AppointmentResponseDTO[]> => {
  try {
    const auth = await getStoredAuthData();
    const response = await fetch(
      `${BASE_URL}/patients/${auth?.user.userId}/appointments?sort=dateTime`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth?.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch appointments: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export { createAppointment };
