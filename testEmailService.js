const EmailService = require("./EmailService");
const MockProviderA = require("./MockProviderA");
const MockProviderB = require("./MockProviderB");

// Create instances of mock providers
const providerA = new MockProviderA();
const providerB = new MockProviderB();

// Pass providers to EmailService constructor
const emailService = new EmailService(providerA, providerB);

async function testEmails() {
    console.log("Starting email send tests...\n");

    // First email
    await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello 1", body: "Body 1" });
    // Second email
    await emailService.sendEmail("email2", { to: "user2@example.com", subject: "Hello 2", body: "Body 2" });
    // Try sending email1 again to test idempotency
    await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello 1 again", body: "Body 1 again" });

    // Print status of each email
    console.log("📦 Status of email1:", emailService.getStatus("email1"));
    console.log("📦 Status of email2:", emailService.getStatus("email2"));
}

testEmails()
    .then(() => console.log("\nTest complete."))
    .catch((err) => console.error("Error during test:", err));
