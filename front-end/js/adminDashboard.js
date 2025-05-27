import { getDoctors, saveDoctor, filterDoctors, deleteDoctor } from './doctorService.js';
import { createDoctorCard } from '../components/doctorCard.js';

// Placeholder for openModal
function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.classList.add('show');
}

async function loadDoctorCards() {
    const content = document.getElementById('content');
    content.innerHTML = '';
    try {
        const doctors = await getDoctors();
        if (doctors.length === 0) {
            content.innerHTML = '<p>No doctors found.</p>';
            return;
        }
        doctors.forEach(doctor => {
            content.appendChild(createDoctorCard(doctor));
        });
    } catch (error) {
        content.innerHTML = '<p>Error loading doctors.</p>';
    }
}

async function filterDoctorsOnChange() {
    const search = document.getElementById('searchBar').value.toLowerCase();
    const time = document.getElementById('sortByTime').value;
    const specialty = document.getElementById('filterBySpecialty').value;
    const content = document.getElementById('content');
    content.innerHTML = '';

    try {
        const doctors = await filterDoctors({ search, time, specialty });
        if (doctors.length === 0) {
            content.innerHTML = '<p>No doctors found.</p>';
            return;
        }
        doctors.forEach(doctor => {
            content.appendChild(createDoctorCard(doctor));
        });
    } catch (error) {
        content.innerHTML = '<p>Error filtering doctors.</p>';
    }
}

async function adminAddDoctor() {
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('doctorSpecialty').value;
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;
    const mobile = document.getElementById('doctorMobile').value;
    const availability = document.getElementById('doctorAvailability').value;

    const doctor = { name, specialty, email, password, mobile, availability };
    const token = localStorage.getItem('token');

    try {
        await saveDoctor(doctor, token);
        document.getElementById('modal').classList.remove('show');
        loadDoctorCards();
    } catch (error) {
        alert('Error adding doctor: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDoctorCards();

    document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
    document.getElementById('sortByTime').addEventListener('change', filterDoctorsOnChange);
    document.getElementById('filterBySpecialty').addEventListener('change', filterDoctorsOnChange);

    document.getElementById('addDoctorBtn').addEventListener('click', () => {
        openModal(`
            <h3>Add New Doctor</h3>
            <input type="text" id="doctorName" placeholder="Name">
            <input type="text" id="doctorSpecialty" placeholder="Specialty">
            <input type="email" id="doctorEmail" placeholder="Email">
            <input type="password" id="doctorPassword" placeholder="Password">
            <input type="text" id="doctorMobile" placeholder="Mobile Number">
            <input type="text" id="doctorAvailability" placeholder="Availability (e.g., Morning)">
            <button onclick="adminAddDoctor()">Add Doctor</button>
        `);
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('show');
    });
});