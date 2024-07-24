// app.js

// Initialize EmailJS
emailjs.init({publicKey: "%%PUBLIC_KEY%%"});

function sendEmail(event) {
    event.preventDefault();

    // Collect the form data
    const serviceID = '%%SERVICE_ID%%';
    const templateID = '%%TEMPLATE_ID%%';

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Email sent successfully!');
        })
        .catch(error => {
            console.error('Failed to send email.', error);
            alert('Failed to send email.');
        });
}

// Add an event listener to the form
document.getElementById('contactForm').addEventListener('submit', sendEmail);