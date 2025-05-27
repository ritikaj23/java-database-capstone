import { API_BASE_URL } from '../config.js';

export async function getDoctors() {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
}

export async function saveDoctor(doctor, token) {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(doctor)
    });

    if (!response.ok) throw new Error('Failed to save doctor');
    return await response.json();
}

export async function filterDoctors({ search, time, specialty }) {
    let url = `${API_BASE_URL}/doctors?`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (time) url += `time=${time}&`;
    if (specialty) url += `specialty=${specialty}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to filter doctors');
    return await response.json();
}

export async function deleteDoctor(id, token) {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Failed to delete doctor');
    return { success: true };
}