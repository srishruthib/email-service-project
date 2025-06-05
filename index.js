const EmailService = require('./EmailService');
const MockProviderA = require('./MockProviderA');
const MockProviderB = require('./MockProviderB');

const providerA = new MockProviderA();
const providerB = new MockProviderB();

const emailService = new EmailService(providerA, providerB);

async function run() {
    await emailService.sendEmail('email1', { to: 'user@example.com', subject: 'Hello', body: 'Welcome!' });
    await emailService.sendEmail('email2', { to: 'user2@example.com', subject: 'Hi', body: 'Test email' });
    await emailService.sendEmail('email1', { to: 'user@example.com', subject: 'Hello', body: 'Welcome!' });
}

run();
