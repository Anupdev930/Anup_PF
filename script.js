// 1. Function to load HTML components
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
        } else {
            console.error(`File not found: ${file}`); // Agar file nahi mili to ye error aayega
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

// 2. Initialize Form Logic (With Safety Check)
function initForm() {
    const form = document.getElementById('contactForm');
    
    // SAFETY CHECK: Agar form load nahi hua, to code yahi ruk jayega (Error nahi dega)
    if (!form) {
        console.warn("Contact form not found yet. Skipping event listener.");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var btn = document.getElementById('submitBtn');
        var status = document.getElementById('statusMsg');
        
        btn.innerHTML = "Sending...";
        btn.disabled = true;

        var formData = new FormData(this);
        // TUMHARA GOOGLE SCRIPT URL
        var scriptURL = 'https://script.google.com/macros/s/AKfycbzt_1g74UDlG-zHY4jvn193BlWMFebs7EPI7fuMruMOaCLeFr7GaQr_fcuMX4GWYls/exec'; 

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

// 3. Load Everything
async function loadAllComponents() {
    await loadComponent('header-container', 'components/header.html');
    await loadComponent('hero-container', 'components/hero.html');
    await loadComponent('services-container', 'components/services.html');
    await loadComponent('portfolio-container', 'components/portfolio.html');
    await loadComponent('contact-container', 'components/contact.html');
    await loadComponent('footer-container', 'components/footer.html');

    // Initialize Logics
    initForm();
    initMobileMenu(); // <--- NEW LINE ADDED HERE
}

// Function to Initialize Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (hamburger && navMenu) {
        // Toggle Menu on Click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', loadAllComponents);
