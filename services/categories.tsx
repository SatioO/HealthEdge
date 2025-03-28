import { BASE_URL } from '.';

export type Category = {
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/specialities/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();

    return categories.map((category: string) => ({ name: category }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};