import { config } from '../config/config.js';
import { openModal } from '../components/modals.js';

function selectRole(role) {
    localStorage.setItem('userRole', role);
    const modalContent = `
        <form id="login-form">
            <h2>${role} Login</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" class="input-field" required>
            <label for="password">Password:</label>
            <input type="password" id="password" class="input-field" required>
            <button type="submit" class="button">Login</button>
        </form>
    `;
    openModal(modalContent);

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const credentials = role === 'Doctor' ? { email: username, password } : { username, password };

        try {
            const endpoint = role === 'Admin' ? config.ADMIN_LOGIN_ENDPOINT :
                           role === 'Doctor' ? config.DOCTOR_LOGIN_ENDPOINT :
                           config.PATIENT_LOGIN_ENDPOINT;
            const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', role);
                window.location.href = role === 'Admin' ? '/pages/adminDashboard.html' :
                                      role === 'Doctor' ? '/pages/doctorDashboard.html' :
                                      '/pages/patientDashboard.html';
            } else {
                alert('Invalid credentials!');
            }
        } catch (error) {
            alert('Error during login: ' + error.message);
        }
    });
}

window.onload = () => {
    document.getElementById('admin-btn').addEventListener('click', () => selectRole('Admin'));
    document.getElementById('doctor-btn').addEventListener('click', () => selectRole('Doctor'));
    document.getElementById('patient-btn').addEventListener('click', () => selectRole('Patient'));
};