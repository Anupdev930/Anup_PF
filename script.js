// Function to load HTML components dynamically
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
        } else {
            console.error(`Error loading ${file}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error fetching ${file}:`, error);
    }
}

// Function to initialize Form Logic (Runs AFTER contact form is loaded)
function initForm() {
    const form = document.getElementById('contactForm');
    
    // Check if form exists to avoid errors
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default reload
            
            var btn = document.getElementById('submitBtn');
            var status = document.getElementById('statusMsg');
            
            // UI Feedback
            btn.innerHTML = "Sending...";
            btn.disabled = true;

            var formData = new FormData(this);
            
            // YOUR REAL APPS SCRIPT URL
            var scriptURL = 'https://script.google.com/macros/s/AKfycbzt_1g74UDlG-zHY4jvn193BlWMFebs7EPI7fuMruMOaCLeFr7GaQr_fcuMX4GWYls/exec'; 

            fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                // Success
                status.innerHTML = "Thanks! We will contact you soon.";
                status.style.color = "green";
                btn.innerHTML = "Send Message";
                btn.disabled = false;
                form.reset();
            })
            .catch(error => {
                // Error
                console.error('Error!', error.message);
                status.innerHTML = "Something went wrong. Please try again.";
                status.style.color = "red";
                btn.innerHTML = "Send Message";
                btn.disabled = false;
            });
        });
    }
}

// MAIN EXECUTION: Load all components sequentially
async function loadAllComponents() {
    // Load Header, Hero, Services, Contact, Footer
    await loadComponent('header-container', 'components/header.html');
    await loadComponent('hero-container', 'components/hero.html');
    await loadComponent('services-container', 'components/services.html');
    await loadComponent('contact-container', 'components/contact.html');
    await loadComponent('footer-container', 'components/footer.html');

    // After HTML is injected, attach the JavaScript logic
    initForm();
}

// Run the loader when page opens
document.addEventListener('DOMContentLoaded', loadAllComponents);
