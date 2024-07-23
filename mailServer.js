const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// CORS configuration
// const allowedOrigins = ['https://paulclue.com'];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: "paulclue20@gmail.com",
      pass: "%%PASSWORD%%", 
    },
  });

  const mailOptions = {
    from: email,
    to: "paulclue20@gmail.com",
    subject: `New message from ${name}`,
    text: message,
  };
  console.log("email", email)

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Failed to send email.");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});