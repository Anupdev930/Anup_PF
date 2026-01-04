document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form reload
    
    var btn = document.getElementById('submitBtn');
    var status = document.getElementById('statusMsg');
    
    // Change button text to indicate processing
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    // Collect form data
    var formData = new FormData(this);
    
    // YOUR APPS SCRIPT WEB APP URL GOES HERE
    var scriptURL = 'https://script.google.com/macros/s/AKfycbzt_1g74UDlG-zHY4jvn193BlWMFebs7EPI7fuMruMOaCLeFr7GaQr_fcuMX4GWYls/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Handle success
        status.innerHTML = "Thanks! We will contact you soon.";
        status.style.color = "green";
        btn.innerHTML = "Send Message";
        btn.disabled = false;
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        // Handle error
        console.error('Error!', error.message);
        status.innerHTML = "Something went wrong. Please try again.";
        status.style.color = "red";
        btn.innerHTML = "Send Message";
        btn.disabled = false;
    });
});

// Function to load HTML components
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
    
    // Check if form exists (to prevent errors if contact section isn't loaded yet)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var btn = document.getElementById('submitBtn');
            var status = document.getElementById('statusMsg');
            
            btn.innerHTML = "Sending...";
            btn.disabled = true;

            var formData = new FormData(this);
            // REPLACE WITH YOUR GOOGLE SCRIPT URL
            var scriptURL = 'YOUR_WEB_APP_URL_HERE'; 

            fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                status.innerHTML = "Thanks! We will contact you soon.";
                status.style.color = "green";
                btn.innerHTML = "Send Message";
                btn.disabled = false;
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                status.innerHTML = "Something went wrong.";
                status.style.color = "red";
                btn.innerHTML = "Send Message";
                btn.disabled = false;
            });
        });
    }
}

// MAIN EXECUTION: Load all components sequentially
async function loadAllComponents() {
    // We use 'await' to ensure sections load in order
    await loadComponent('header-container', 'components/header.html');
    await loadComponent('hero-container', 'components/hero.html');
    await loadComponent('services-container', 'components/services.html');
    await loadComponent('contact-container', 'components/contact.html');
    await loadComponent('footer-container', 'components/footer.html');

    // After HTML is loaded, initialize the Javascript logic for the form
    initForm();
}

// Run the loader when page opens
document.addEventListener('DOMContentLoaded', loadAllComponents);
