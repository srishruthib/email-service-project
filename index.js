const express = require("express");
const EmailService = require("./EmailService");
const MockProviderA = require("./MockProviderA");
const MockProviderB = require("./MockProviderB");

const app = express();
app.use(express.json());

const providerA = new MockProviderA();
const providerB = new MockProviderB();
const emailService = new EmailService(providerA, providerB);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("Email Service is running!");
});

// Endpoint to send email via API
app.post("/send-email", async (req, res) => {
    const { emailId, emailData } = req.body;
    if (!emailId || !emailData) {
        return res.status(400).json({ success: false, message: "emailId and emailData are required" });
    }

    await emailService.sendEmail(emailId, emailData);
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

// Endpoint to get status of a specific email
app.get("/status/:emailId", (req, res) => {
    const emailId = req.params.emailId;
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

// 🧪 Test trigger endpoint (for Render browser view)
app.get("/run-tests", async (req, res) => {
    const results = [];

    // Capture logs
    const originalLog = console.log;
    const captureLog = (msg) => {
        results.push(msg);
        originalLog(msg);
    };
    console.log = captureLog;

    // Run test emails
    await emailService.sendEmail("email1", {
        to: "user@example.com",
        subject: "Hello",
        body: "Welcome!"
    });

    await emailService.sendEmail("email2", {
        to: "user2@example.com",
        subject: "Hi",
        body: "Test email"
    });

    await emailService.sendEmail("email1", {
        to: "user@example.com",
        subject: "Hello again",
        body: "Duplicate send"
    });

    // Add status output
    results.push("📦 Status of email1: " + JSON.stringify(emailService.getStatus("email1")));
    results.push("📦 Status of email2: " + JSON.stringify(emailService.getStatus("email2")));

    // Restore console
    console.log = originalLog;

    // Show output in browser
    res.send("<pre>" + results.join("\n") + "</pre>");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
