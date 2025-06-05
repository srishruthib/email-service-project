const express = require("express");
const EmailService = require("./EmailService");
const MockProviderA = require("./MockProviderA");
const MockProviderB = require("./MockProviderB");

const app = express();
app.use(express.json());

const providerA = new MockProviderA();
const providerB = new MockProviderB();
const emailService = new EmailService(providerA, providerB);

// Send email endpoint
app.post("/send-email", async (req, res) => {
    const { emailId, emailData } = req.body;
    if (!emailId || !emailData) {
        return res.status(400).json({ success: false, message: "emailId and emailData are required" });
    }

    await emailService.sendEmail(emailId, emailData);
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

// Email status endpoint
app.get("/status/:emailId", (req, res) => {
    const emailId = req.params.emailId;
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

// Health check endpoint (optional)
app.get("/", (req, res) => {
    res.send("Email Service is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const EmailService = require('./EmailService');
// const MockProviderA = require('./MockProviderA');
// const MockProviderB = require('./MockProviderB');

// const providerA = new MockProviderA();
// const providerB = new MockProviderB();

// const emailService = new EmailService(providerA, providerB);

// async function run() {
//     await emailService.sendEmail('email1', { to: 'user@example.com', subject: 'Hello', body: 'Welcome!' });
//     await emailService.sendEmail('email2', { to: 'user2@example.com', subject: 'Hi', body: 'Test email' });
//     await emailService.sendEmail('email1', { to: 'user@example.com', subject: 'Hello', body: 'Welcome!' });
// }

// run();
