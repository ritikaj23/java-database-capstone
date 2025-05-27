import { API_BASE_URL } from '../config.js';

// Placeholder for openModal since modals.js is not in the structure
function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.classList.add('show');
}

const ADMIN_LOGIN_ENDPOINT = `${API_BASE_URL}/admin`;
const DOCTOR_LOGIN_ENDPOINT = `${API_BASE_URL}/doctor/login`;

function selectRole(role) {
    localStorage.setItem('userRole', role);
}

window.onload = () => {
    const adminBtn = document.getElementById('adminBtn');
    const doctorBtn = document.getElementById('doctorBtn');
    const patientBtn = document.getElementById('patientBtn');
    const closeModal = document.getElementById('closeModal');

    adminBtn.addEventListener('click', () => {
        openModal(`
            <h3>Admin Login</h3>
            <input type="text" id="adminUsername" placeholder="Username">
            <input type="password" id="adminPassword" placeholder="Password">
            <button onclick="adminLoginHandler()">Login</button>
        `);
    });

    doctorBtn.addEventListener('click', () => {
        openModal(`
            <h3>Doctor Login</h3>
            <input type="email" id="doctorEmail" placeholder="Email">
            <input type="password" id="doctorPassword" placeholder="Password">
            <button onclick="doctorLoginHandler()">Login</button>
        `);
    });

    patientBtn.addEventListener('click', () => {
        openModal(`
            <h3>Patient Login</h3>
            <p>Patient login is not implemented in this lab.</p>
            <button onclick="document.getElementById('modal').classList.remove('show')">Close</button>
        `);
    });

    closeModal.addEventListener('click', () => {
        document.getElementById('modal').classList.remove('show');
    });
};

window.adminLoginHandler = async () => {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const admin = { username, password };

    try {
        const response = await fetch(ADMIN_LOGIN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const data = await response.json();
            selectRole('admin');
            localStorage.setItem('token', data.token);
            window.location.href = 'adminDashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
};

window.doctorLoginHandler = async () => {
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;
    const doctor = { email, password };

    try {
        const response = await fetch(DOCTOR_LOGIN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();
            selectRole('doctor');
            localStorage.setItem('token', data.token);
            window.location.href = 'doctorDashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
};