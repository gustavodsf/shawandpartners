import axios from 'axios';
import { UserDTO } from './Card';

export const fetchAllUsers = async (): Promise<Array<UserDTO>> => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const {data} = await axios.get(`${backendUrl}/api/users`);
    return data.data as UserDTO[];
  } catch (error) {
    console.error('Error fetching users', error);
    return [];
  }
};