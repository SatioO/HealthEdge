import { BASE_URL } from '.';
type ProviderName = {
    givenName: string;
    familyName: string;
    middleName: string;
};
type Provider = {
    fullName: string;
    name: ProviderName;
    speciality: string;
    userId: number;
    username: string;
};

export async function getProviders(specialityId: number): Promise<Provider> {
    const response = await fetch(
        BASE_URL + '/specialities/' + specialityId + '/providers'
    );
    const data = await response.json();
    return data;
}
