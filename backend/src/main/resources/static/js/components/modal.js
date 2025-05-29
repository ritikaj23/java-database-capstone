export function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
    
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}