import { BASE_URL } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthParams = {
  username: string;
  password: string;
};

interface NameDTO {
  firstName: string;
  lastName: string;
}

enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface JwtUserResponseDTO {
  userId: number;
  username: string;
  roles: string[];
  name: NameDTO;
  email: string;
  status: UserStatus;
}

export interface JwtResponseDTO {
  accessToken: string;
  user: JwtUserResponseDTO;
}
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Cache auth data in memory for faster access
let cachedToken: string | null = null;
let cachedUser: JwtUserResponseDTO | null = null;

const clearAuthCache = () => {
  cachedToken = null;
  cachedUser = null;
};

const storeAuthData = async (response: JwtResponseDTO) => {
  try {
    // Update memory cache
    cachedToken = response.accessToken;
    cachedUser = response.user;

    // Store in persistent storage
    await Promise.all([
      AsyncStorage.setItem(TOKEN_KEY, response.accessToken),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user)),
    ]);
  } catch (error) {
    console.error('Error storing auth data:', error);
    throw error;
  }
};

export const getStoredAuthData = async (): Promise<JwtResponseDTO | null> => {
  try {
    // Check memory cache first
    if (cachedToken && cachedUser) {
      return {
        accessToken: cachedToken,
        user: cachedUser,
      };
    }

    // Fall back to persistent storage
    const [token, user] = await Promise.all([
      AsyncStorage.getItem(TOKEN_KEY),
      AsyncStorage.getItem(USER_KEY),
    ]);

    if (!token || !user) return null;

    // Update cache
    cachedToken = token;
    cachedUser = JSON.parse(user);

    return {
      accessToken: token,
      user: JSON.parse(user),
    };
  } catch (error) {
    console.error('Error getting stored auth data:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
    clearAuthCache();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

const login = async (params: AuthParams): Promise<JwtResponseDTO> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    await storeAuthData(data);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { login };
