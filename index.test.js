const assert = require('assert');
const { sendLamports } = require('./index');

describe('sendLamports', () => {
    it('should throw an error if no lamports amount is specified', async () => {
        try {
            await sendLamports(null, 'somePublicKey');
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'No lamports amount specified');
        }
    });

    it('should throw an error if no public key is specified', async () => {
        try {
            await sendLamports(100, null);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'No public key specified to send lamports to');
        }
    });

    it('should return a signature if lamports amount and public key are specified', async () => {
        const amountInLamports = 100;
        const suppliedToPubKey = 'CtVhhCQNjaP4XfK4yAGrG76rHMRk8L7AW28PTTcpJqKM';

        // Mock the necessary dependencies (e.g., Connection, getKeypairFromEnvironment, etc.) for testing purposes

        const signature = await sendLamports(amountInLamports, suppliedToPubKey);
        assert.strictEqual(typeof signature, 'string');
        // Add additional assertions if needed
    });
});