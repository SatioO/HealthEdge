import axios from 'axios';

export async function getProviders(category: string, speciality: string) {
    const response = await axios.get('/providers/filter', {
        params: { category, speciality },
    });
    return response;
}
