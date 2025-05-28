import { deleteDoctor } from '../services/doctorService.js';
import { getPatientData, showBookingOverlay } from '../services/patientServices.js';

export function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.classList.add('doctor-card');
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('doctor-info');
    infoDiv.innerHTML = `
        <h3>${doctor.name}</h3>
        <p>Specialty: ${doctor.specialty}</p>
        <p>Contact: ${doctor.contact}</p>
    `;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('card-actions');
    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (role === 'Admin') {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.className = 'button';
        removeBtn.addEventListener('click', async () => {
            const result = await deleteDoctor(doctor.id, token);
            if (result.success) {
                card.remove();
            } else {
                alert('Failed to delete doctor');
            }
        });
        actionsDiv.appendChild(removeBtn);
    } else if (role === 'Patient' && token) {
        const bookBtn = document.createElement('button');
        bookBtn.textContent = 'Book Now';
        bookBtn.className = 'button';
        bookBtn.addEventListener('click', async () => {
            const patientData = await getPatientData(token);
            if (patientData) {
                showBookingOverlay(patientData, doctor);
            } else {
                alert('Please log in to book an appointment');
            }
        });
        actionsDiv.appendChild(bookBtn);
    } else if (role === 'Patient') {
        const bookBtn = document.createElement('button');
        bookBtn.textContent = 'Book Now';
        bookBtn.className = 'button';
        bookBtn.addEventListener('click', () => {
            alert('Please log in to book an appointment');
        });
        actionsDiv.appendChild(bookBtn);
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);
    return card;
}