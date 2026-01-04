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
