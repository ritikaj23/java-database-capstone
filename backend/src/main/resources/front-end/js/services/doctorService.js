import { config } from '../config/config.js';

const doctorService = {
    getDoctors: async (token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/doctors`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch doctors');
            return await response.json();
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return [];
        }
    },
    saveDoctor: async (doctor, token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/doctors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(doctor)
            });
            if (!response.ok) throw new Error('Failed to save doctor');
            return await response.json();
        } catch (error) {
            console.error('Error saving doctor:', error);
            return null;
        }
    },
    filterDoctor: async (search = '', specialty = '', time = '', token) => {
        try {
            const query = new URLSearchParams({ search, specialty, time }).toString();
            const response = await fetch(`${config.API_BASE_URL}/doctors?${query}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to filter doctors');
            return await response.json();
        } catch (error) {
            console.error('Error filtering doctors:', error);
            return [];
        }
    },
    deleteDoctor: async (id, token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/doctors/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete doctor');
            return { success: true };
        } catch (error) {
            console.error('Error deleting doctor:', error);
            return { success: false };
        }
    }
};

export default doctorService;