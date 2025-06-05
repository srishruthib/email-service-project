const EmailService = require('./EmailService');

class MockProvider {
    constructor(name, fail = false) {
        this.name = name;
        this.fail = fail;
        this.send = jest.fn(this.send.bind(this)); // make send a jest mock
    }

    async send(emailData) {
        if (this.fail) {
            throw new Error(`${this.name} failed`);
        }
        return true;
    }
}

describe('EmailService', () => {
    let providerA;
    let providerB;
    let emailService;

    beforeEach(() => {
        providerA = new MockProvider("ProviderA", false);
        providerB = new MockProvider("ProviderB", false);
        emailService = new EmailService(providerA, providerB);
    });

    test('should send emails and handle idempotency', async () => {
        await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello" });
        await emailService.sendEmail("email2", { to: "user2@example.com", subject: "Hi again" });
        await emailService.sendEmail("email1", { to: "user@example.com", subject: "Hello" }); // idempotent

        expect(providerA.send).toHaveBeenCalledTimes(2);
        expect(emailService.getStatus("email1").success).toBe(true);
        expect(emailService.getStatus("email2").success).toBe(true);
        expect(emailService.getStatus("email1").reason).toBe('Already sent (idempotent)');
    });
});
