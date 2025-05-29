import patientServices from './services/patientServices.js';
import { createPatientRow } from './components/patientRows.js';
import { openModal } from '../components/modals.js';
import { formatDate } from './util.js';

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Doctor') {
        window.location.href = '/pages/defineRole.html';
        return;
    }

    const searchBar = document.getElementById('searchBar');
    const todayBtn = document.getElementById('today-btn');
    const dateFilter = document.getElementById('date-filter');
    const patientList = document.getElementById('patient-list');
    const noPatientRecord = document.getElementById('noPatientRecord');

    async function renderPatients(patients) {
        patientList.innerHTML = '';
        noPatientRecord.classList.add('hidden');
        if (!patients.length) {
            noPatientRecord.classList.remove('hidden');
            return;
        }
        patients.forEach(patient => {
            const row = createPatientRow(patient);
            // Add prescription button event listener
            row.querySelector('.prescription-btn').addEventListener('click', () => {
                openPrescriptionModal(patient);
            });
            patientList.appendChild(row);
        });
    }

    async function loadPatientsForToday() {
        try {
            const patients = await patientServices.getPatientsForToday(token);
            await renderPatients(patients);
        } catch (error) {
            console.error('Error loading today\'s patients:', error);
            noPatientRecord.textContent = 'Failed to load patients. Please try again.';
            noPatientRecord.classList.remove('hidden');
        }
    }

    async function loadPatientsByDate(date) {
        try {
        const patients = await patientServices.getPatientsByDate(date, token);
        await renderPatients(patients);
    } catch (error) {
        console.error('Error loading patients by date:', error);
        noPatientRecord.textContent = 'Failed to load patients for selected date.';
        noPatientRecord.classList.remove('hidden');
    }
}

    function openPrescriptionModal(patient) {
        const modalContent = `
            <div class="modal-content">
                <h2>Prescription for ${patient.name}</h2>
                <form id="prescription-form">
                    <label for="prescription-text">Prescription Details:</label>
                    <textarea id="prescription-text" class="input-field" required rows="5"></textarea>
                    <label for="prescription-date">Date:</label>
                    <input type="date" id="prescription-date" class="input-field" value="${formatDate(new Date())}" required>
                    <button type="submit" class="button">Submit Prescription</button>
                </form>
            </div>
        `;
        openModal(modalContent);

        const prescriptionForm = document.getElementById('prescription-form');
        prescriptionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prescription = {
                patientId: patient.id,
                details: document.getElementById('prescription-text').value,
                date: document.getElementById('prescription-date').value
            };
            // Placeholder for prescription API call
            console.log('Submitting prescription:', prescription);
            try {
                // Simulated API call (replace with actual endpoint when available)
                const response = await fetch(`${config.API_BASE_URL}/doctor/prescriptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(prescription)
                });
                if (!response.ok) throw new Error('Failed to submit prescription');
                alert('Prescription submitted successfully');
                document.getElementById('modal').classList.add('hidden');
            } catch (error) {
                console.error('Error submitting prescription:', error);
                alert('Failed to submit prescription');
            }
        });
    }

    searchBar.addEventListener('input', async () => {
        const date = dateFilter.value || formatDate(new Date()); // Default to today if no date selected
        try {
            const patients = await patientServices.getPatientsByDate(date, token);
            const filtered = patients.filter(patient => 
                patient.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchBar.value.toLowerCase())
            );
            await renderPatients(filtered);
        } catch (error) {
            console.error('Error searching patients:', error);
            noPatientRecord.textContent = 'Failed to search patients.';
            noPatientRecord.classList.remove('hidden');
        }
    });

    todayBtn.addEventListener('click', loadPatientsForToday);

    dateFilter.addEventListener('change', () => {
        if (dateFilter.value) {
            loadPatientsByDate(dateFilter.value);
        } else {
            loadPatientsForToday();
        }
    });

    // Initial load
    await loadPatientsForToday();
});