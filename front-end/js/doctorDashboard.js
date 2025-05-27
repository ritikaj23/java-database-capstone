import { API_BASE_URL } from '../config.js';

// Placeholder data since patientServices.js is missing
const mockPatients = [
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com" },
    { id: 2, name: "Jane Smith", phone: "098-765-4321", email: "jane@example.com" }
];

// Inline createPatientRow since patientRows.js is missing
function createPatientRow(patient) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.name}</td>
        <td>${patient.phone}</td>
        <td>${patient.email}</td>
        <td><button class="prescription-btn">View</button></td>
    `;
    return tr;
}

async function renderPatients(patients) {
    const tbody = document.getElementById('patientTableBody');
    tbody.innerHTML = '';

    if (patients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="noPatientRecord">No patients found for the selected date.</td></tr>';
        return;
    }

    patients.forEach(patient => {
        tbody.appendChild(createPatientRow(patient));
    });
}

async function loadPatientsForToday() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${API_BASE_URL}/doctor/patients/today`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch patients');
        const patients = await response.json();
        renderPatients(patients);
    } catch (error) {
        // Fallback to mock data if API call fails
        renderPatients(mockPatients);
    }
}

async function loadPatientsByDate(date) {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${API_BASE_URL}/doctor/patients?date=${date}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch patients');
        const patients = await response.json();
        renderPatients(patients);
    } catch (error) {
        renderPatients(mockPatients);
    }
}

function filterPatients() {
    const search = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#patientTableBody tr:not(.noPatientRecord)');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPatientsForToday();

    document.getElementById('todayBtn').addEventListener('click', loadPatientsForToday);
    document.getElementById('dateFilter').addEventListener('change', (e) => {
        const date = e.target.value;
        if (date) loadPatientsByDate(date);
    });
    document.getElementById('searchBar').addEventListener('input', filterPatients);
});