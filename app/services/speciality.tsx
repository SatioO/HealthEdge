import { BASE_URL } from '.';

export type Speciality = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export const getSpecialities = async (
  category: string
): Promise<Speciality[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/specialities?category=${category}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch specialities: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching specialities:', error);
    throw error;
  }
};
