const express = require("express");
const EmailService = require("./EmailService");
const MockProviderA = require("./MockProviderA");
const MockProviderB = require("./MockProviderB");

const providerA = new MockProviderA();
const providerB = new MockProviderB();
const emailService = new EmailService(providerA, providerB);

// 🧪 Test emails when server starts
(async function runTests() {
    console.log("Starting email send tests...\n");
    await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello", body: "Welcome!" });
    await emailService.sendEmail("email2", { to: "user2@example.com", subject: "Hi", body: "Test email" });
    await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello again", body: "Duplicate" });

    console.log("📦 Status of email1:", emailService.getStatus("email1"));
    console.log("📦 Status of email2:", emailService.getStatus("email2"));
    console.log("Test complete.\n");
})();

const app = express();
app.use(express.json());

// API endpoints
app.post("/send-email", async (req, res) => {
    const { emailId, emailData } = req.body;
    await emailService.sendEmail(emailId, emailData);
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

app.get("/status/:emailId", (req, res) => {
    const status = emailService.getStatus(req.params.emailId);
    res.json({ success: true, status });
});

app.get("/", (req, res) => {
    res.send("Email Service is running!");
});

// Start server
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
