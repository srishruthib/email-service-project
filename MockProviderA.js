class MockProviderA {
    constructor() {
        this.name = 'ProviderA';
    }

    async send(emailData) {
        if (Math.random() < 0.5) {
            throw new Error('ProviderA failed to send email');
        }
        console.log('ProviderA sent:', emailData.to);
    }
}

module.exports = MockProviderA;
