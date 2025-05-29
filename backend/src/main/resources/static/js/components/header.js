function renderHeader() {
    const headerDiv = document.getElementById('header');
    if (window.location.pathname.includes('defineRole.html')) {
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        headerDiv.innerHTML = `
            <header class="header">
                <div class="logo-section">
                    <img src="/assets/images/logo/Logo.png" alt="Smart Clinic Logo" style="height: 50px;">
                    <span class="logo-title">Smart Clinic</span>
                </div>
            </header>
        `;
        return;
    }

    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');
    let headerContent = `
        <header class="header">
            <div class="logo-section">
                <img src="/assets/images/logo/Logo.png" alt="Smart Clinic Logo" style="height: 50px;">
                <span class="logo-title">Smart Clinic</span>
            </div>
            <nav>
    `;

    if (token && role) {
        headerContent += `
            <span>Welcome, ${role}</span>
            <select id="roleSelector" class="select-dropdown">
                <option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option>
                <option value="Doctor" ${role === 'Doctor' ? 'selected' : ''}>Doctor</option>
                <option value="Patient" ${role === 'Patient' ? 'selected' : ''}>Patient</option>
            </select>
            <button id="logout-btn" class="button">Logout</button>
        `;
        if (role === 'Admin') {
            headerContent += `<button id="add-doctor-btn" class="button">Add Doctor</button>`;
        }
    } else {
        headerContent += `<a href="/pages/defineRole.html">Select Role</a>`;
    }

    headerContent += `</nav></header>`;
    headerDiv.innerHTML = headerContent;

    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const roleSelector = document.getElementById('roleSelector');
    const logoutBtn = document.getElementById('logout-btn');
    if (roleSelector) {
        roleSelector.addEventListener('change', (e) => {
            const selectedRole = e.target.value;
            localStorage.setItem('userRole', selectedRole);
            window.location.href = `${selectedRole.toLowerCase()}Dashboard.html`;
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            window.location.href = '/pages/defineRole.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', renderHeader);