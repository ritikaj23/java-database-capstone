import doctorService from './services/doctorService.js';
import { createDoctorCard } from './components/doctorCard.js';
import { openModal } from './components/modals.js';

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (!token || role !== 'Admin') {
        window.location.href = '/pages/defineRole.html';
        return;
    }

    const searchBar = document.getElementById('searchBar');
    const filterSpecialty = document.getElementById('filter-specialty');
    const filterTime = document.getElementById('filter-time');
    const addDoctorBtn = document.getElementById('add-doctor-btn');
    const content = document.getElementById('content');

    async function loadDoctorCards() {
        const search = searchBar.value;
        const specialty = filterSpecialty.value;
        const time = filterTime.value;
        const doctors = await doctorService.filterDoctor(search, specialty, time, token);
        content.innerHTML = doctors.length ? '' : '<p>No doctors found</p>';
        doctors.forEach(doctor => content.appendChild(createDoctorCard(doctor)));
    }

    addDoctorBtn.addEventListener('click', () => {
        const modalContent = `
            <form id="add-doctor-form">
                <h2>Add New Doctor</h2>
                <label for="name">Name:</label>
                <input type="text" id="name" class="input-field" required>
                <label for="specialty">Specialty:</label>
                <input type="text" id="specialty" class="input-field" required>
                <label for="contact">Contact:</label>
                <input type="text" id="contact" class="input-field" required>
                <label for="password">Password:</label>
                <input type="password" id="password" class="input-field" required>
                <label for="mobile">Mobile:</label>
                <input type="text" id="mobile" class="input-field" required>
                <label for="availability">Availability:</label>
                <input type="text" id="availability" class="input-field" required>
                <button type="submit" class="button">Add Doctor</button>
            </form>
        `;
        openModal(modalContent);

        const addDoctorForm = document.getElementById('add-doctor-form');
        addDoctorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const doctor = {
                name: document.getElementById('name').value,
                specialty: document.getElementById('specialty').value,
                contact: document.getElementById('contact').value,
                password: document.getElementById('password').value,
                mobile: document.getElementById('mobile').value,
                availability: document.getElementById('availability').value
            };
            const result = await doctorService.saveDoctor(doctor, token);
            if (result) {
                document.getElementById('modal').classList.add('hidden');
                loadDoctorCards();
            } else {
                alert('Failed to add doctor');
            }
        });
    });

    searchBar.addEventListener('input', loadDoctorCards);
    filterSpecialty.addEventListener('change', loadDoctorCards);
    filterTime.addEventListener('change', loadDoctorCards);

    await loadDoctorCards();
});