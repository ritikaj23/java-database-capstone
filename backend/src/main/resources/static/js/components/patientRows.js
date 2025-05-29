export function createPatientRow(patient) {
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