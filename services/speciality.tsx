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
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching specialities:', error);
    throw error;
  }
};
