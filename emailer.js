// app.js

// Initialize EmailJS
// emailjs.init("%%PUBLIC_KEY%%");

emailjs.init({
  publicKey: '%%PASSWORD%%',
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 5000,
  },
});

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

  emailjs
    .send(serviceID, templateID, templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      alert('Email sent successfully!');
    })
    .catch((error) => {
      console.error('Failed to send email.', error);
      alert('Failed to send email.');
    });
}

// Add an event listener to the form
document.getElementById('contactForm').addEventListener('submit', sendEmail);
