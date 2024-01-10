require('dotenv').config()

const { PublicKey, Connection, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js')
const { getKeypairFromEnvironment } = require('@solana-developers/node-helpers')


/**
 * Sends a specified amount of lamports to a specified public key.
 * 
 * @param {number} amountInLamports - The amount of lamports to send.
 * @param {string} suppliedToPubKey - The public key to send the lamports to.
 * @returns {Promise<string>} - A promise that resolves to the transaction signature.
 * @throws {Error} - If no lamports amount is specified or no public key is specified.
 */
async function sendLamports(amountInLamports, suppliedToPubKey) {

    if (!amountInLamports) {
        throw new Error('No lamports amount specified')
    }

    if (!suppliedToPubKey) {
        throw new Error('No public key specified to send lamports to')
    }

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

    const supplierKeypair = getKeypairFromEnvironment('SECRET_KEY')
    const suppliedPublicKey = new PublicKey(suppliedToPubKey)

    const transaction = new Transaction()

    const instruction = SystemProgram.transfer({
        fromPubkey: supplierKeypair.publicKey,
        toPubkey: suppliedPublicKey,
        lamports: amountInLamports
    })

    transaction.add(instruction)

    const signature = await sendAndConfirmTransaction(connection, transaction, [supplierKeypair])

    return signature
}

module.exports = {
    sendLamports
}