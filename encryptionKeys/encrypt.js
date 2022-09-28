const crypto = require('crypto');
const { buffer } = require('stream/consumers');

// data encryption
function encryptWithPublicKey(publicKey, message) {
    // convert the message to a buffer
    const bufferMessage = Buffer.from(message, 'utf-8');

    // encrypt and return
    return crypto.publicEncrypt(publicKey, bufferMessage);
}

// this is basically used for signature.
function encryptWithPrivateKey(privateKey, message) {
    const bufferMessage = Buffer.from(message, 'utf-8');
    return crypto.privateEncrypt(privateKey, bufferMessage);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
module.exports.encryptWithPrivateKey = encryptWithPrivateKey;