import { BASE_URL } from '.';

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
  bio: string;
  photoUrl: string;
};

export type AvailableSlot = {
  startDateTime: string;
  endDateTime: string;
  isAvailable: boolean;
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
