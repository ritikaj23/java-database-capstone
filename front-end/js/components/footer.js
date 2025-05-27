function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-column">
                    <h4>Clinic Management</h4>
                    <p>Providing quality healthcare solutions.</p>
                </div>
                <div class="footer-column">
                    <h4>Links</h4>
                    <a href="defineRole.html">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
                <div class="footer-column">
                    <h4>Support</h4>
                    <a href="#">FAQ</a>
                    <a href="#">Help</a>
                </div>
            </div>
        </footer>
    `;
}

renderFooter();