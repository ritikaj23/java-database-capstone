function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    window.location.href = 'defineRole.html';
}

function attachHeaderButtonListeners() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function renderHeader() {
    const headerDiv = document.getElementById('header');

    if (window.location.pathname.includes('defineRole.html')) {
        localStorage.removeItem('userRole');
        headerDiv.innerHTML = `
            <header class="header">
                <div class="logo-section">
                    <img src="../assets/logo.png" alt="Logo" />
                    <span class="logo-title">Clinic Management</span>
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
                <img src="../assets/logo.png" alt="Logo" />
                <span class="logo-title">Clinic Management</span>
            </div>
            <nav>
    `;

    if (role === 'admin') {
        headerContent += `
            <button id="addDoctorBtn">Add Doctor</button>
            <a href="#" id="logoutBtn">Logout</a>
        `;
    } else if (role === 'doctor') {
        headerContent += `
            <a href="#" id="logoutBtn">Logout</a>
        `;
    }

    if (role) {
        headerContent += `
            <select id="roleSelector">
                <option value="admin" ${role === 'admin' ? 'selected' : ''}>Admin</option>
                <option value="doctor" ${role === 'doctor' ? 'selected' : ''}>Doctor</option>
            </select>
        `;
    }

    headerContent += `</nav></header>`;
    headerDiv.innerHTML = headerContent;

    attachHeaderButtonListeners();

    const roleSelector = document.getElementById('roleSelector');
    if (roleSelector) {
        roleSelector.addEventListener('change', (e) => {
            const selectedRole = e.target.value;
            window.location.href = `${selectedRole}Dashboard.html`;
        });
    }
}

renderHeader();