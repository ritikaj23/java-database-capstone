function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-column">
                    <h4>Smart Clinic</h4>
                    <p>© 14/02/2023 Smart Clinic Management System. All rights reserved.</p>
                </div>
                <div class="footer-column">
                    <h4>Links</h4>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    `;
}

document.addEventListener('DOMContentLoaded', renderFooter);