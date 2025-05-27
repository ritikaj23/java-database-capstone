import { deleteDoctor } from '../services/doctorService.js';

export function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.classList.add('doctor-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('doctor-info');
    infoDiv.innerHTML = `
        <h3>${doctor.name}</h3>
        <p>Specialty: ${doctor.specialty}</p>
        <p>Email: ${doctor.email}</p>
        <p>Mobile: ${doctor.mobile}</p>
        <p>Availability: ${doctor.availability}</p>
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('card-actions');

    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (role === 'admin') {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.addEventListener('click', async () => {
            try {
                await deleteDoctor(doctor.id, token);
                card.remove();
            } catch (error) {
                alert('Error deleting doctor: ' + error.message);
            }
        });
        actionsDiv.appendChild(removeBtn);
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);
    return card;
}