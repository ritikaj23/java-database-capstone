import { config } from '../config/config.js';

const patientServices = {
    getPatientsForToday: async (token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/doctor/patients/today`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch today\'s patients');
            return await response.json();
        } catch (error) {
            console.error('Error fetching today\'s patients:', error);
            return [];
        }
    },
    getPatientsByDate: async (date, token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/doctor/patients?date=${date}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch patients by date');
            return await response.json();
        } catch (error) {
            console.error('Error fetching patients by date:', error);
            return [];
        }
    },
    getPatientData: async (token) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/patient/data`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch patient data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching patient data:', error);
            return null;
        }
    },
    showBookingOverlay: (patient, doctor) => {
        console.log(`Booking appointment for ${patient.name} with ${doctor.name}`);
        // Placeholder for booking modal
    }
};

export default patientServices;