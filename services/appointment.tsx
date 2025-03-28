import { BASE_URL } from '@/services';
import { Provider } from '@/services/provider';
import { getStoredAuthData } from '@/services/auth';

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
  patient: PatientDTO;
  id: number;
  dateTime: string; // ZonedDateTime represented as ISO string
  speciality: SpecialityDTO;
  provider: Provider;
};

export type PatientDTO = {
  userId: number;
  username: string;
  name: {
    familyName: string;
    middleName: string | null;
    givenName: string;
  };
  email: string;
  dob: string;
  roles: string[] | null;
  administrativeSex: string;
  maritalStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  addresses: any[];
  mrn: string | null;
  ssn: string | null;
  licenseNumber: string | null;
  is_deceased: string;
  deceased_on: string | null;
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

    let url = '';
    if (auth?.user.roles.includes('provider')) {
      url = `${BASE_URL}/providers/${auth?.user.userId}/appointments?page=0&size=5&sort=dateTime,DESC`;
    } else {
      url = `${BASE_URL}/patients/${auth?.user.userId}/appointments?page=0&size=5&sort=dateTime,DESC`;
    }
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth?.accessToken,
      },
    });

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
